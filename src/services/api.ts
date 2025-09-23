import { Client } from "@gradio/client";
import { StressData, StressResult } from '../types';

export const analyzeStress = async (data: StressData): Promise<StressResult> => {
  console.log('🚀 Sending data to HF Spaces API:', data);

  try {
    // Connect to the Gradio client using the exact working format
    console.log('🔗 Connecting to HuggingFace Space...');
    const client = await Client.connect("mekashishsingh/STRESS-DETECTOR");
    console.log('✅ Successfully connected to HF Space');

    // Call the predict function - try both named and positional parameters
    console.log('📤 Sending prediction request...');
    let result;

    try {
      // First try with named parameters
      console.log('🔄 Trying named parameters...');
      result = await client.predict("/predict", {
        user_name: data.user_name,
        user_age: data.user_age,
        cortisol_val: data.cortisol_val,
        amylase_val: data.amylase_val,
        iga_val: data.iga_val,
        sleep_val: data.sleep_val,
      });
      console.log('✅ Named parameters worked!');
    } catch (namedError) {
      console.log('⚠️ Named parameters failed, trying positional...');
      console.log('🔄 Trying positional parameters...');
      result = await client.predict("/predict", [
        data.user_name,
        data.user_age,
        data.cortisol_val,
        data.amylase_val,
        data.iga_val,
        data.sleep_val,
      ]);
      console.log('✅ Positional parameters worked!');
    }

    console.log('📥 Raw HF response:', result);

    if (result && result.data) {
      console.log('✅ Valid response received, parsing...');
      return parseGradioResponse(result.data, data);
    } else {
      console.error('❌ Invalid response format:', result);
      throw new Error('Invalid response format from HuggingFace model');
    }

  } catch (error) {
    console.error('❌ HuggingFace API call failed:', error);

    // Extract detailed error information
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('🔍 Error message:', errorMessage);
    } else if (typeof error === 'object' && error !== null) {
      console.error('🔍 Error object details:', error);
      // Handle Gradio client error objects
      if ('detail' in error) {
        errorMessage = String(error.detail);
      } else if ('message' in error) {
        errorMessage = String(error.message);
      } else if ('error' in error) {
        errorMessage = String(error.error);
      } else if ('type' in error && 'endpoint' in error) {
        // Gradio status error
        errorMessage = `Gradio ${error.type} error on ${error.endpoint}`;
      } else {
        errorMessage = JSON.stringify(error);
      }
    } else {
      errorMessage = String(error);
    }

    console.error('🔍 Final error message:', errorMessage);
    throw new Error(`HuggingFace model error: ${errorMessage}`);
  }
};

const parseGradioResponse = (responseData: any, inputData: StressData): StressResult => {
  console.log('🔍 Parsing HF response data:', responseData);
  console.log('📊 Response type:', typeof responseData);
  console.log('📋 Is Array:', Array.isArray(responseData));
  console.log('📏 Array length:', Array.isArray(responseData) ? responseData.length : 'N/A');

  if (Array.isArray(responseData) && responseData.length >= 1) {
    const [predictionText, gaugeChart, biomarkerChart] = responseData;

    console.log('📝 Prediction text:', predictionText);
    console.log('📊 Gauge chart:', gaugeChart);
    console.log('🧪 Biomarker chart:', biomarkerChart);

    // Extract the actual stress score from HF model output
    let score = 50; // fallback
    let level: 'Low' | 'Moderate' | 'High' = 'Moderate';

    // Try to extract score from prediction text first
    if (typeof predictionText === 'string') {
      console.log('🔍 Searching for score in prediction text...');

      // Multiple patterns to catch different output formats
      const scorePatterns = [
        /stress.*?probability.*?(\d+\.?\d*)%?/i,
        /stress.*?level.*?(\d+\.?\d*)%?/i,
        /stress.*?score.*?(\d+\.?\d*)%?/i,
        /probability.*?(\d+\.?\d*)%?/i,
        /score.*?(\d+\.?\d*)%?/i,
        /(\d+\.?\d*)%?\s*stress/i,
        /(\d+\.?\d*)%?/g  // Any percentage/number
      ];

      for (const pattern of scorePatterns) {
        const matches = predictionText.match(pattern);
        if (matches) {
          const extractedScore = parseFloat(matches[1]);
          if (!isNaN(extractedScore) && extractedScore >= 0 && extractedScore <= 100) {
            score = extractedScore;
            console.log('✅ Found score in text:', score, 'using pattern:', pattern);
            break;
          }
        }
      }
    }

    // Try to extract from gauge chart if available
    if (gaugeChart && typeof gaugeChart === 'object') {
      console.log('🔍 Checking gauge chart for score...');

      // Check various gauge chart structures
      if (gaugeChart.data && Array.isArray(gaugeChart.data)) {
        for (const dataPoint of gaugeChart.data) {
          if (dataPoint.value !== undefined) {
            const chartScore = parseFloat(dataPoint.value);
            if (!isNaN(chartScore) && chartScore >= 0 && chartScore <= 100) {
              score = chartScore;
              console.log('✅ Found score in gauge chart data:', score);
              break;
            }
          }
        }
      }

      if (gaugeChart.value !== undefined) {
        const chartScore = parseFloat(gaugeChart.value);
        if (!isNaN(chartScore) && chartScore >= 0 && chartScore <= 100) {
          score = chartScore;
          console.log('✅ Found direct value in gauge chart:', score);
        }
      }
    }

    console.log('🎯 Final extracted score:', score);

    // Determine stress level based on actual model score
    if (score < 30) {
      level = 'Low';
    } else if (score > 70) {
      level = 'High';
    } else {
      level = 'Moderate';
    }

    console.log('📊 Determined stress level:', level);

    // Create result using actual HF model output
    const result: StressResult = {
      score: Math.round(Math.max(0, Math.min(100, score))),
      level,
      recommendations: [
        typeof predictionText === 'string' ? predictionText : `Stress probability: ${score.toFixed(1)}%`,
        score > 70 ? 'Consider stress management techniques and professional consultation' :
        score < 30 ? 'Excellent stress management! Continue your healthy lifestyle' :
        'Monitor stress levels and consider lifestyle adjustments',
        'Regular biomarker monitoring recommended for optimal health'
      ],
      metrics: {
        cortisol_norm: inputData.cortisol_val / 20, // 0-20 range, direct percentage
        amylase_norm: inputData.amylase_val / 200, // 50-200 range, direct percentage
        iga_norm: inputData.iga_val / 80, // 20-80 range, direct percentage
        sleep_norm: inputData.sleep_val / 12, // 0-12 range, direct percentage
      },
      user_name: inputData.user_name,
      user_age: inputData.user_age,
      cortisol_val: inputData.cortisol_val,
      amylase_val: inputData.amylase_val,
      iga_val: inputData.iga_val,
      sleep_val: inputData.sleep_val,
    };

    console.log('✅ Parsed result:', result);
    return result;
  }

  // Handle unexpected response format
  console.warn('⚠️ Unexpected response format, checking alternatives...');

  if (typeof responseData === 'string') {
    console.log('📝 String response detected:', responseData);
    const scoreMatch = responseData.match(/(\d+\.?\d*)%?/);
    const score = scoreMatch ? parseFloat(scoreMatch[1]) : 50;

    return {
      score: Math.round(Math.max(0, Math.min(100, score))),
      level: score > 70 ? 'High' : score < 30 ? 'Low' : 'Moderate',
      recommendations: [
        responseData,
        'Analysis based on your biomarker levels',
        'Continue monitoring your stress indicators'
      ],
      metrics: {
        cortisol_norm: Math.min(inputData.cortisol_val / 25, 1),
        amylase_norm: Math.min(inputData.amylase_val / 200, 1),
        iga_norm: Math.max(0, Math.min(1, (50 - inputData.iga_val) / 30)),
        sleep_norm: Math.max(0, Math.min(1, (8 - inputData.sleep_val) / 8)),
      },
      user_name: inputData.user_name,
      user_age: inputData.user_age,
      cortisol_val: inputData.cortisol_val,
      amylase_val: inputData.amylase_val,
      iga_val: inputData.iga_val,
      sleep_val: inputData.sleep_val,
    };
  }

  console.error('❌ Unable to parse response:', responseData);
  throw new Error(`Unable to parse HuggingFace response: ${JSON.stringify(responseData)}`);
};