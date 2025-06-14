import React, { useState, useEffect } from 'react';

// School data manually parsed and integrated from provided text and image immersives.
// The primary key for estimation is '積點（參考）' (refPoints).
// '錄取積分' (score), '會考總積點最低錄取標準' (examStandard), '單科標示' (subjectDetail),
// '區排' (rank), and '招生群科名稱' (admissionSubject) are included for comprehensive context.
// Data has been cleaned to ensure 'name' is base school name and 'admissionSubject' is specific program.
const schoolData = [
  {
    name: "武陵高中",
    years: [
      { year: 113, score: 33, examStandard: null, subjectDetail: null, rank: "592~692", refPoints: 32, admissionSubject: '普通科' },
      { year: 112, score: 33, examStandard: "5A7+", subjectDetail: "國A++數A++", rank: "606-707", refPoints: 32, admissionSubject: '普通科' },
      { year: 111, score: 33, examStandard: "5A6+", subjectDetail: "國A++數A++", rank: "217-219", refPoints: 31, admissionSubject: '普通科' },
      { year: 110, score: 33, examStandard: "(5A)", subjectDetail: null, rank: null, refPoints: 32, admissionSubject: '普通科' },
    ]
  },
  {
    name: "中壢高中",
    years: [
      { year: 113, score: 31, examStandard: null, subjectDetail: null, rank: "1812~1912", refPoints: 28, admissionSubject: '普通科' },
      { year: 112, score: 31, examStandard: "4A1B6+", subjectDetail: "國A++數A++", rank: "1936-2032", refPoints: 27, admissionSubject: '普通科' },
      { year: 111, score: 31, examStandard: "4A1B5+", subjectDetail: "國A++", rank: "2165-2266", refPoints: 26, admissionSubject: '普通科' },
      { year: 110, score: 31, examStandard: "(4A1B)", subjectDetail: null, rank: null, refPoints: 27, admissionSubject: '普通科' },
    ]
  },
  {
    name: "桃園高中",
    years: [
      { year: 113, score: 31, examStandard: null, subjectDetail: null, rank: "2121~2520", refPoints: 24, admissionSubject: '普通科' },
      { year: 112, score: 29, examStandard: "4A1B3+", subjectDetail: "國A++", rank: "2136-2241", refPoints: 24, admissionSubject: '普通科' },
      { year: 111, score: 29, examStandard: "3A2B8+", subjectDetail: "國A++數A++", rank: "3010-3109", refPoints: 23, admissionSubject: '普通科' },
      { year: 110, score: 31, examStandard: "(4A1B)", subjectDetail: null, rank: null, refPoints: 24, admissionSubject: '普通科' },
    ]
  },
  {
    name: "內壢高中",
    years: [
      { year: 113, score: 29, examStandard: null, subjectDetail: null, rank: "3130~3229", refPoints: 23, admissionSubject: '普通科' },
      { year: 112, score: 27, examStandard: "3A2B5+", subjectDetail: "國A+數B++", rank: "3180-3290", refPoints: 23, admissionSubject: '普通科' },
      { year: 111, score: 27, examStandard: "3A2B4+", subjectDetail: "國B++數A", rank: "3700-3829", refPoints: 20, admissionSubject: '普通科' },
      { year: 110, score: 29, examStandard: "(3A2B)", subjectDetail: null, rank: null, refPoints: 22, admissionSubject: '普通科' },
    ]
  },
  {
    name: "陽明高中",
    years: [
      { year: 113, score: 27, examStandard: null, subjectDetail: null, rank: "4184~4257", refPoints: 21, admissionSubject: '普通科' },
      { year: 112, score: 27, examStandard: "2A3B6+", subjectDetail: "國A數A", rank: "4185-4291", refPoints: 20, admissionSubject: '普通科' },
      { year: 111, score: 27, examStandard: "2A3B3+", subjectDetail: "國A數A", rank: "4751-4871", refPoints: 19, admissionSubject: '普通科' },
      { year: 110, score: 27, examStandard: "(2A3B)", subjectDetail: null, rank: null, refPoints: 19, admissionSubject: '普通科' },
    ]
  },
  {
    name: "永豐高中",
    years: [
      { year: 113, score: 27, examStandard: null, subjectDetail: null, rank: "5320~5421", refPoints: 20, admissionSubject: '普通科' },
      { year: 112, score: 25, examStandard: null, subjectDetail: null, rank: "5367-5423", refPoints: 21, admissionSubject: '普通科' },
      { year: 111, score: 25, examStandard: "1A4B9+", subjectDetail: null, rank: "5440-5539", refPoints: 19, admissionSubject: '普通科' },
      { year: 110, score: 25, examStandard: "(1A4B)", subjectDetail: null, rank: null, refPoints: 17, admissionSubject: '普通科' },
    ]
  },
  {
    name: "平鎮高中",
    years: [
      { year: 113, score: 25, examStandard: null, subjectDetail: null, rank: "6000~6100", refPoints: 19, admissionSubject: '普通科' },
      { year: 112, score: 25, examStandard: "2A3B5+", subjectDetail: "國A+", rank: "4500內", refPoints: 21, admissionSubject: '普通科' },
      { year: 111, score: 25, examStandard: "1A4B9+", subjectDetail: "國B++數B++", rank: "5440-5539", refPoints: 18, admissionSubject: '普通科' },
      { year: 110, score: 25, examStandard: "(1A4B)", subjectDetail: null, rank: null, refPoints: 20, admissionSubject: '普通科' },
    ]
  },
  {
    name: "大園高中",
    years: [
      { year: 113, score: 25, examStandard: null, subjectDetail: null, rank: "6200~6301", refPoints: 19, admissionSubject: '普通科' },
      { year: 112, score: 25, examStandard: "1A4B6+", subjectDetail: "國B++", rank: "6850-6150", refPoints: 19, admissionSubject: '普通科' },
      { year: 111, score: 25, examStandard: "1A4B5+", subjectDetail: "國B+數B++英A", rank: "6850-6986", refPoints: 18, admissionSubject: '普通科' },
      { year: 110, score: 25, examStandard: "(1A4B)", subjectDetail: null, rank: null, refPoints: 18, admissionSubject: '普通科' },
    ]
  },
  {
    name: "中壢高商",
    years: [
      { year: 113, score: 25, examStandard: null, subjectDetail: null, rank: "6722~6821", refPoints: 19, admissionSubject: '普通科' },
      { year: 112, score: 25, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  {
    name: "壽山高中",
    years: [
      { year: 113, score: 25, examStandard: null, subjectDetail: null, rank: "7236~7336", refPoints: 18, admissionSubject: '普通科' },
      { year: 112, score: 25, examStandard: null, subjectDetail: null, rank: "8537-8647", refPoints: 15, admissionSubject: '普通科' },
      { year: 111, score: 23, examStandard: "5B7+", subjectDetail: null, rank: "7698-7827", refPoints: 16, admissionSubject: '普通科' },
      { year: 110, score: 20, examStandard: "(5B)", subjectDetail: null, rank: null, refPoints: 17, admissionSubject: '普通科' },
    ]
  },
  {
    name: "南崁高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "10061~10191", refPoints: 15, admissionSubject: '普通科' },
      { year: 112, score: 23, examStandard: "1A4B4+", subjectDetail: null, rank: "6060-6150", refPoints: 19, admissionSubject: '普通科' },
      { year: 111, score: 23, examStandard: "5B7+", subjectDetail: "國B++數B++", rank: "7098-7200", refPoints: 17, admissionSubject: '普通科' },
      { year: 110, score: 20, examStandard: "(5B)", subjectDetail: null, rank: null, refPoints: 17, admissionSubject: '普通科' },
    ]
  },
  {
    name: "楊梅高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "7320~7425", refPoints: 19, admissionSubject: '普通科' },
      { year: 112, score: 23, examStandard: "5B5+", subjectDetail: "國B++", rank: "8800-8910", refPoints: 19, admissionSubject: '普通科' },
      { year: 111, score: 23, examStandard: "5B3+", subjectDetail: "國B++社B+", rank: "7827-7946", refPoints: 18, admissionSubject: '普通科' },
      { year: 110, score: 20, examStandard: "(5B)", subjectDetail: null, rank: null, refPoints: 13, admissionSubject: '普通科' },
    ]
  },
  {
    name: "觀音高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "9677~9781", refPoints: 12, admissionSubject: '普通科' },
      { year: 112, score: 23, examStandard: "5B1+", subjectDetail: null, rank: "10000-10118", refPoints: 19, admissionSubject: '普通科' },
      { year: 111, score: 22, examStandard: "5B", subjectDetail: null, rank: "10393-10632", refPoints: 16, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  {
    name: "大溪高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "10266~10392", refPoints: 10, admissionSubject: '普通科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "10266-10392", refPoints: 19, admissionSubject: '普通科' },
      { year: 111, score: 23, examStandard: null, subjectDetail: null, rank: "7388-7500", refPoints: 18, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  {
    name: "育達高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  {
    name: "振聲高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "7880~7980", refPoints: 12, admissionSubject: '普通科' },
      { year: 112, score: 22, examStandard: null, subjectDetail: null, rank: "11412-11512", refPoints: 10, admissionSubject: '普通科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  {
    name: "龍潭高中",
    years: [
      { year: 113, score: 21, examStandard: null, subjectDetail: null, rank: "11640~11747", refPoints: 11, admissionSubject: '普通科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  // --- Specific programs and their associated schools, name is now the base school name ---
  {
    name: "新屋高中",
    years: [
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13047~13248", refPoints: 8, admissionSubject: '普通科' },
      { year: 112, score: 22, examStandard: null, subjectDetail: null, rank: "11308-11411", refPoints: 12, admissionSubject: '普通科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Electronic Engineering Department
      { year: 113, score: 22, examStandard: null, subjectDetail: null, rank: "11103~11203", refPoints: 13, admissionSubject: '電子科' },
      { year: 112, score: 22, examStandard: null, subjectDetail: null, rank: "10393-10510", refPoints: 11, admissionSubject: '電子科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "12804-12980", refPoints: 10, admissionSubject: '電子科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '電子科' },
    ]
  },
  {
    name: "啟英高中",
    years: [
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 6, admissionSubject: '普通科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13714-13918", refPoints: 8, admissionSubject: '普通科' },
      { year: 111, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Culinary Arts Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 6, admissionSubject: '餐飲科' },
      { year: 112, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '餐飲科' },
      { year: 111, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '餐飲科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '餐飲科' },
      // Automobile Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 5, admissionSubject: '汽車科' },
      { year: 112, score: 17, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '汽車科' },
      { year: 111, score: 17, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '汽車科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '汽車科' },
      // Information Technology Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 6, admissionSubject: '資訊科' },
      { year: 112, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '資訊科' },
      { year: 111, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '資訊科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '資訊科' },
    ]
  },
  {
    name: "治平高中",
    years: [
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "12381~12482", refPoints: 8, admissionSubject: '普通科' },
      { year: 112, score: 20, examStandard: null, subjectDetail: null, rank: "12581-12790", refPoints: 10, admissionSubject: '普通科' },
      { year: 111, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Information Technology Department
      { year: 113, score: 18, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 8, admissionSubject: '資訊科' },
      { year: 112, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '資訊科' },
      { year: 111, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '資訊科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '資訊科' },
      // Home Economics Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13047~13148", refPoints: 7, admissionSubject: '家政科' },
      { year: 112, score: 17, examStandard: null, subjectDetail: null, rank: "13047-13148", refPoints: 8, admissionSubject: '家政科' },
      { year: 111, score: 17, examStandard: null, subjectDetail: null, rank: "13047-13148", refPoints: 8, admissionSubject: '家政科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '家政科' },
    ]
  },
  {
    name: "復旦高中",
    years: [
      { year: 113, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 112, score: 27, examStandard: null, subjectDetail: null, rank: "3331-3440", refPoints: 24, admissionSubject: '普通科' },
      { year: 111, score: 27, examStandard: null, subjectDetail: null, rank: "3440-3539", refPoints: 22, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '普通科' },
    ]
  },
  {
    name: "北科附工",
    years: [
      // Electrical Engineering Department
      { year: 113, score: 27, examStandard: null, subjectDetail: null, rank: "4460~4570", refPoints: 24, admissionSubject: '電機科' },
      { year: 112, score: 27, examStandard: null, subjectDetail: null, rank: "4805-4905", refPoints: 20, admissionSubject: '電機科' },
      { year: 111, score: 27, examStandard: null, subjectDetail: null, rank: "5980-6100", refPoints: 19, admissionSubject: '電機科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '電機科' },
      // Mechanical Engineering Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "8208~8319", refPoints: 15, admissionSubject: '機械科' },
      { year: 112, score: 25, examStandard: null, subjectDetail: null, rank: "8120-8220", refPoints: 16, admissionSubject: '機械科' },
      { year: 111, score: 25, examStandard: null, subjectDetail: null, rank: "7388-7500", refPoints: 16, admissionSubject: '機械科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '機械科' },
      // Drafting Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "8535~8634", refPoints: 14, admissionSubject: '製圖科' },
      { year: 112, score: 24, examStandard: null, subjectDetail: null, rank: "7288-7387", refPoints: 16, admissionSubject: '製圖科' },
      { year: 111, score: 24, examStandard: null, subjectDetail: null, rank: "6850-6986", refPoints: 16, admissionSubject: '製圖科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '製圖科' },
      // Biomedical Technology Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "9568~9676", refPoints: 12, admissionSubject: '生物科技醫藥科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "9832-9932", refPoints: 16, admissionSubject: '生物科技醫藥科' },
      { year: 111, score: 23, examStandard: null, subjectDetail: null, rank: "8911-9040", refPoints: 15, admissionSubject: '生物科技醫藥科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '生物科技醫藥科' },
      // Horticulture Department
      { year: 113, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '園藝科' },
      { year: 112, score: 21, examStandard: null, subjectDetail: null, rank: "13910-17376", refPoints: 16, admissionSubject: '園藝科' },
      { year: 111, score: 21, examStandard: null, subjectDetail: null, rank: "12156-12303", refPoints: 16, admissionSubject: '園藝科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '園藝科' },
      // Chemical Engineering Department
      { year: 113, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '化工科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "7599-7698", refPoints: 18, admissionSubject: '化工科' },
      { year: 111, score: 23, examStandard: null, subjectDetail: null, rank: "7599-7698", refPoints: 18, admissionSubject: '化工科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '化工科' },
      // Automotive Department
      { year: 113, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '汽車科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "9227-9327", refPoints: 14, admissionSubject: '汽車科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "7599-7698", refPoints: 14, admissionSubject: '汽車科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '汽車科' },
    ]
  },
  {
    name: "壽山高中",
    years: [
      // Applied English Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "8635~8742", refPoints: 14, admissionSubject: '應用英語科' },
      { year: 112, score: 25, examStandard: null, subjectDetail: null, rank: "8647-9637", refPoints: 18, admissionSubject: '應用英語科' },
      { year: 111, score: 24, examStandard: null, subjectDetail: null, rank: "8911-8985", refPoints: 18, admissionSubject: '應用英語科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '應用英語科' },
      // International Trade Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "7989~8090", refPoints: 15, admissionSubject: '國際貿易科' },
      { year: 112, score: 24, examStandard: null, subjectDetail: null, rank: "7188-7287", refPoints: 18, admissionSubject: '國際貿易科' },
      { year: 111, score: 23, examStandard: null, subjectDetail: null, rank: "8985-9040", refPoints: 16, admissionSubject: '國際貿易科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '國際貿易科' },
      // Business Management Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "8492~8534", refPoints: 14, admissionSubject: '商業經營科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "7815-7916", refPoints: 17, admissionSubject: '商業經營科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "9161-9252", refPoints: 14, admissionSubject: '商業經營科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '商業經營科' },
    ]
  },
  {
    name: "中壢家商",
    years: [
      // International Trade Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "9748~9848", refPoints: 14, admissionSubject: '國際貿易科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "9748-9848", refPoints: 18, admissionSubject: '國際貿易科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "8131-8220", refPoints: 17, admissionSubject: '國際貿易科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '國際貿易科' },
      // Business Management Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "8535~8634", refPoints: 14, admissionSubject: '商業經營科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "8131-8220", refPoints: 18, admissionSubject: '商業經營科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "8131-8220", refPoints: 17, admissionSubject: '商業經營科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '商業經營科' },
      // Home Economics Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "10219~10489", refPoints: 10, admissionSubject: '家政科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '家政科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '家政科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '家政科' },
      // Culinary Management Department
      { year: 113, score: 25, examStandard: null, subjectDetail: null, rank: "6302~6403", refPoints: 16, admissionSubject: '餐飲管理科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '餐飲管理科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '餐飲管理科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '餐飲管理科' },
      // Multimedia Design Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "9222~9334", refPoints: 14, admissionSubject: '多媒體設計科' },
      { year: 112, score: 21, examStandard: null, subjectDetail: null, rank: "11513-11613", refPoints: 16, admissionSubject: '多媒體設計科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "11613-11727", refPoints: 15, admissionSubject: '多媒體設計科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '多媒體設計科' },
    ]
  },
  {
    name: "觀音高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "9677~9781", refPoints: 12, admissionSubject: '普通科' },
      { year: 112, score: 23, examStandard: "5B1+", subjectDetail: null, rank: "10000-10118", refPoints: 19, admissionSubject: '普通科' },
      { year: 111, score: 22, examStandard: "5B", subjectDetail: null, rank: "10393-10632", refPoints: 16, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Multimedia Animation Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "8422~8534", refPoints: 14, admissionSubject: '多媒體動畫科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '多媒體動畫科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '多媒體動畫科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '多媒體動畫科' },
    ]
  },
  {
    name: "振聲高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "7880~7980", refPoints: 12, admissionSubject: '普通科' },
      { year: 112, score: 22, examStandard: null, subjectDetail: null, rank: "11412-11512", refPoints: 10, admissionSubject: '普通科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Information Technology Department
      { year: 113, score: 21, examStandard: null, subjectDetail: null, rank: "12245~12346", refPoints: 12, admissionSubject: '資訊科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "10511-10632", refPoints: 11, admissionSubject: '資訊科' },
      { year: 111, score: 23, examStandard: null, subjectDetail: null, rank: "10983-11090", refPoints: 12, admissionSubject: '資訊科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '資訊科' },
      // International Trade Department
      { year: 113, score: 21, examStandard: null, subjectDetail: null, rank: "12001~12100", refPoints: 12, admissionSubject: '國際貿易科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '國際貿易科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '國際貿易科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '國際貿易科' },
      // Business Management Department
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: "10097~10206", refPoints: 11, admissionSubject: '商業經營科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '商業經營科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '商業經營科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '商業經營科' },
      // Advertising Design Department
      { year: 113, score: 22, examStandard: null, subjectDetail: null, rank: "10590~10690", refPoints: 11, admissionSubject: '廣告設計科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "10511-10632", refPoints: 11, admissionSubject: '商業設計科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "10983-11090", refPoints: 11, admissionSubject: '商業設計科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '廣告設計科' },
      // Applied Japanese Department
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13004~13287", refPoints: 8, admissionSubject: '應用日語科' },
      { year: 112, score: 20, examStandard: null, subjectDetail: null, rank: "11812-11923", refPoints: 9, admissionSubject: '應用日語科' },
      { year: 111, score: 21, examStandard: null, subjectDetail: null, rank: "11924-12030", refPoints: 10, admissionSubject: '應用日語科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '應用日語科' },
      // Applied English Department
      { year: 113, score: 22, examStandard: null, subjectDetail: null, rank: "11090~11190", refPoints: 11, admissionSubject: '應用英語科' },
      { year: 112, score: 21, examStandard: null, subjectDetail: null, rank: "11812-11923", refPoints: 12, admissionSubject: '應用英語科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "11727-11812", refPoints: 12, admissionSubject: '應用英語科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '應用英語科' },
      // Automotive Department
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "12457~12586", refPoints: 9, admissionSubject: '汽車科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13406-13508", refPoints: 9, admissionSubject: '汽車科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "10710-10860", refPoints: 10, admissionSubject: '汽車科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '汽車科' },
    ]
  },
  {
    name: "新興高中",
    years: [
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13047~13248", refPoints: 8, admissionSubject: '普通科' },
      { year: 112, score: 22, examStandard: null, subjectDetail: null, rank: "11308-11411", refPoints: 12, admissionSubject: '普通科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Automotive Department
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "12587~12686", refPoints: 9, admissionSubject: '汽車科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 6, admissionSubject: '汽車科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '汽車科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '汽車科' },
      // Data Processing Department
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "11640~11747", refPoints: 11, admissionSubject: '資料處理科' },
      { year: 112, score: 22, examStandard: null, subjectDetail: null, rank: "11308-11411", refPoints: 11, admissionSubject: '資料處理科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "11412-11512", refPoints: 11, admissionSubject: '資料處理科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '資料處理科' },
      // Multimedia Design Department
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "11418~11515", refPoints: 11, admissionSubject: '多媒體設計科' },
      { year: 112, score: 20, examStandard: null, subjectDetail: null, rank: "12981-13092", refPoints: 11, admissionSubject: '多媒體設計科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "12981-13092", refPoints: 10, admissionSubject: '多媒體設計科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '多媒體設計科' },
      // Culinary Management Department
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "12245~12346", refPoints: 11, admissionSubject: '餐飲管理科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13714-13918", refPoints: 11, admissionSubject: '餐飲管理科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 11, admissionSubject: '餐飲管理科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '餐飲管理科' },
      // International Trade Department
      { year: 113, score: 18, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 9, admissionSubject: '國際貿易科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13203-13340", refPoints: 12, admissionSubject: '國際貿易科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "12981-13092", refPoints: 12, admissionSubject: '國際貿易科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '國際貿易科' },
      // Applied English Department
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13204~13315", refPoints: 11, admissionSubject: '應用英語科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "12680-12790", refPoints: 9, admissionSubject: '應用英語科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "12680-12790", refPoints: 9, admissionSubject: '應用英語科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '應用英語科' },
      // Aircraft Maintenance Department
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "12982~13092", refPoints: 9, admissionSubject: '飛機修護科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13406-13508", refPoints: 9, admissionSubject: '飛機修護科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13406-13508", refPoints: 9, admissionSubject: '飛機修護科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '飛機修護科' },
      // Performing Arts Department
      { year: 113, score: 15, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 6, admissionSubject: '表演藝術科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '表演藝術科' },
      { year: 111, score: 18, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 8, admissionSubject: '表演藝術科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '表演藝術科' },
      // Fashion Styling Department
      { year: 113, score: 18, examStandard: null, subjectDetail: null, rank: "13288~16515", refPoints: 6, admissionSubject: '時尚造型科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 10, admissionSubject: '時尚造型科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 10, admissionSubject: '時尚造型科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '時尚造型科' },
    ]
  },
  {
    name: "永平工商",
    years: [
      // Culinary Arts Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13919~17376", refPoints: 5, admissionSubject: '餐飲科' },
      { year: 112, score: 23, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 12, admissionSubject: '餐飲科' },
      { year: 111, score: 22, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 11, admissionSubject: '餐飲科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '餐飲科' },
      // Aircraft Maintenance Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13919~17376", refPoints: 5, admissionSubject: '飛機修護科' },
      { year: 112, score: 17, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 7, admissionSubject: '飛機修護科' },
      { year: 111, score: 17, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 7, admissionSubject: '飛機修護科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '飛機修護科' },
      // Applied Japanese Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13919~17376", refPoints: 5, admissionSubject: '應用日語科' },
      { year: 112, score: 17, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 6, admissionSubject: '應用日語科' },
      { year: 111, score: 17, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 6, admissionSubject: '應用日語科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '應用日語科' },
    ]
  },
  {
    name: "世紀綠能工商",
    years: [
      // Culinary Arts Department
      { year: 113, score: 16, examStandard: null, subjectDetail: null, rank: "13919~17376", refPoints: 5, admissionSubject: '餐飲科' },
      { year: 112, score: 17, examStandard: null, subjectDetail: null, rank: "13714-13918", refPoints: 8, admissionSubject: '餐飲科' },
      { year: 111, score: 17, examStandard: null, subjectDetail: null, rank: "13714-13918", refPoints: 8, admissionSubject: '餐飲科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '餐飲科' },
    ]
  },
  {
    name: "育達高中",
    years: [
      { year: 113, score: 23, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 112, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 111, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      { year: 110, score: null, examStandard: null, subjectDetail: null, rank: null, refPoints: null, admissionSubject: '普通科' },
      // Fashion Styling Department
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13305~13405", refPoints: 10, admissionSubject: '時尚造型科' },
      { year: 112, score: 19, examStandard: null, subjectDetail: null, rank: "13305-13405", refPoints: 10, admissionSubject: '時尚造型科' },
      { year: 111, score: 19, examStandard: null, subjectDetail: null, rank: "13305-13405", refPoints: 10, admissionSubject: '時尚造型科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '時尚造型科' },
      // Applied English Department
      { year: 113, score: 20, examStandard: null, subjectDetail: null, rank: "11924~12030", refPoints: 11, admissionSubject: '應用英語科' },
      { year: 112, score: 21, examStandard: null, subjectDetail: null, rank: "11924-12030", refPoints: 11, admissionSubject: '應用英語科' },
      { year: 111, score: 21, examStandard: null, subjectDetail: null, rank: "11924-12030", refPoints: 11, admissionSubject: '應用英語科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '應用英語科' },
      // Information Technology Department
      { year: 113, score: 19, examStandard: null, subjectDetail: null, rank: "13305~13405", refPoints: 9, admissionSubject: '資訊科' },
      { year: 112, score: 20, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 9, admissionSubject: '資訊科' },
      { year: 111, score: 20, examStandard: null, subjectDetail: null, rank: "13919-17376", refPoints: 9, admissionSubject: '資訊科' },
      { year: 110, score: null, examStandard: null, rank: null, refPoints: null, admissionSubject: '資訊科' },
    ]
  },
];


function App() {
  const [inputPoints, setInputPoints] = useState('');
  const [inputSchoolName, setInputSchoolName] = useState(''); // New state for school name input
  const [inputAdmissionSubject, setInputAdmissionSubject] = useState(''); // New state for admission subject input
  const [estimatedSchools, setEstimatedSchools] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  // Removed llmAdvice and isLoadingAdvice states


  // Function to handle estimation by total points
  const handleEstimateByPoints = () => {
    // Clear other input fields
    setInputSchoolName('');
    setInputAdmissionSubject('');

    const points = parseInt(inputPoints, 10);

    if (isNaN(points) || points < 0 || points > 35) {
      setEstimatedSchools([]);
      alert('請輸入有效的會考總積點 (0-35之間的數字)。');
      return;
    }

    const results = [];
    schoolData.forEach(school => {
      school.years.forEach(yearData => {
        if (yearData.refPoints !== null && yearData.refPoints <= points) {
          results.push({
            schoolName: school.name,
            year: yearData.year,
            score: yearData.score || '無資料',
            examStandard: yearData.examStandard || '無資料',
            subjectDetail: yearData.subjectDetail || '無資料',
            rank: yearData.rank || '無資料',
            refPoints: yearData.refPoints,
            admissionSubject: yearData.admissionSubject || '無資料'
          });
        }
      });
    });

    results.sort((a, b) => {
      if (a.refPoints !== b.refPoints) {
        return b.refPoints - a.refPoints;
      }
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      const aScore = parseInt(a.score);
      const bScore = parseInt(b.score);
      if (!isNaN(aScore) && !isNaN(bScore)) {
        return bScore - aScore;
      }
      return 0;
    });

    setEstimatedSchools(results);
    setShowDisclaimer(true);
  };

  // Function to handle search by school name
  const handleSearchBySchoolName = () => {
    // Clear other input fields
    setInputPoints('');
    setInputAdmissionSubject('');

    const name = inputSchoolName.trim().toLowerCase(); // Trim and convert to lowercase for case-insensitive search

    if (!name) {
      setEstimatedSchools([]);
      alert('請輸入學校名稱。');
      return;
    }

    const results = [];
    schoolData.forEach(school => {
      // Check if the base school name includes the search term
      if (school.name.toLowerCase().includes(name)) {
        school.years.forEach(yearData => {
          results.push({
            schoolName: school.name,
            year: yearData.year,
            score: yearData.score || '無資料',
            examStandard: yearData.examStandard || '無資料',
            subjectDetail: yearData.subjectDetail || '無資料',
            rank: yearData.rank || '無資料',
            refPoints: yearData.refPoints || '無資料',
            admissionSubject: yearData.admissionSubject || '無資料'
          });
        });
      }
    });

    // Sort results: by year in descending order (newer year first)
    results.sort((a, b) => b.year - a.year);

    setEstimatedSchools(results);
    setShowDisclaimer(true);
  };

  // Function to handle search by admission subject name
  const handleSearchByAdmissionSubject = () => {
    // Clear other input fields
    setInputPoints('');
    setInputSchoolName('');

    const subject = inputAdmissionSubject.trim().toLowerCase(); // Trim and convert to lowercase for case-insensitive search

    if (!subject) {
      setEstimatedSchools([]);
      alert('請輸入招生群科名稱。');
      return;
    }

    const results = [];
    schoolData.forEach(school => {
      school.years.forEach(yearData => {
        // Check if the admission subject includes the search term
        if (yearData.admissionSubject && yearData.admissionSubject.toLowerCase().includes(subject)) {
          results.push({
            schoolName: school.name,
            year: yearData.year,
            score: yearData.score || '無資料',
            examStandard: yearData.examStandard || '無資料',
            subjectDetail: yearData.subjectDetail || '無資料',
            rank: yearData.rank || '無資料',
            refPoints: yearData.refPoints || '無資料',
            admissionSubject: yearData.admissionSubject
          });
        }
      });
    });

    // Sort results: by year in descending order (newer year first)
    results.sort((a, b) => b.year - a.year);

    setEstimatedSchools(results);
    setShowDisclaimer(true);
  };

  // Removed generateAdmissionAdvice function


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-inter">
      {/* Title Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 w-full max-w-3xl text-center border-b-4 border-blue-600">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3 leading-tight">114年會考落點預估器</h1>
        <p className="text-lg text-gray-700 mb-2">您可以透過輸入會考總積點、學校名稱或招生群科名稱來預估落點。</p>
        <p className="text-sm text-gray-500">（落點資料來源：111-113年桃連區國中升高中網路上能見資料）</p>
      </div>

      {/* Input Section - Search by Total Points */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl mb-8 flex flex-col items-center space-y-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
          <label htmlFor="pointsInput" className="text-xl font-semibold text-gray-700 whitespace-nowrap md:w-1/3">
            您的會考總積點 (0-35):
          </label>
          <input
            id="pointsInput"
            type="number"
            min="0"
            max="35"
            value={inputPoints}
            onChange={(e) => setInputPoints(e.target.value)}
            className="flex-grow p-4 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-xl w-full md:w-1/3 shadow-sm"
            placeholder="例如: 28"
            aria-label="輸入會考總積點"
          />
          <button
            onClick={handleEstimateByPoints}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-1/3 text-lg"
          >
            依積點預估落點
          </button>
        </div>
        {/* Removed LLM advice button */}
      </div>

      {/* Removed LLM Advice Section */}


      {/* Input Section - Search by School Name */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <label htmlFor="schoolNameInput" className="text-xl font-semibold text-gray-700 whitespace-nowrap md:w-1/3">
          搜尋學校名稱:
        </label>
        <input
          id="schoolNameInput"
          type="text"
          value={inputSchoolName}
          onChange={(e) => setInputSchoolName(e.target.value)}
          className="flex-grow p-4 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-xl w-full md:w-1/3 shadow-sm"
          placeholder="例如: 武陵 或 中壢"
          aria-label="輸入學校名稱"
        />
        <button
          onClick={handleSearchBySchoolName}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-1/3 text-lg"
        >
          依學校名稱搜尋
        </button>
      </div>

      {/* Input Section - Search by Admission Subject Name */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <label htmlFor="admissionSubjectInput" className="text-xl font-semibold text-gray-700 whitespace-nowrap md:w-1/3">
          搜尋招生群科名稱:
        </label>
        <input
          id="admissionSubjectInput"
          type="text"
          value={inputAdmissionSubject}
          onChange={(e) => setInputAdmissionSubject(e.target.value)}
          className="flex-grow p-4 border-2 border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-xl w-full md:w-1/3 shadow-sm"
          placeholder="例如: 普通科 或 餐飲科"
          aria-label="輸入招生群科名稱"
        />
        <button
          onClick={handleSearchByAdmissionSubject}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-1/3 text-lg"
        >
          依群科名稱搜尋
        </button>
      </div>


      {/* Results Section */}
      {estimatedSchools.length > 0 && (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-5 text-center">預估落點結果</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider rounded-tl-xl">
                    學校名稱
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    招生群科名稱
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    年度
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    錄取積分 (參考)
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    會考總積點 (參考)
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    會考總積點最低錄取標準
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    單科標示
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider rounded-tr-xl">
                    區排
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {estimatedSchools.map((school, index) => (
                  <tr key={`${school.name}-${school.admissionSubject}-${school.year}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                      {school.schoolName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {school.admissionSubject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {school.year}年
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {school.score}分
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-blue-700 font-bold">
                      {school.refPoints}點
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {school.examStandard}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {school.subjectDetail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {school.rank}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No results message */}
      {estimatedSchools.length === 0 && (inputPoints !== '' || inputSchoolName !== '' || inputAdmissionSubject !== '') && showDisclaimer && (
        <div className="bg-yellow-50 border-l-8 border-yellow-500 text-yellow-800 p-6 rounded-xl shadow-md w-full max-w-3xl mt-8">
          <p className="font-bold text-lg mb-2">查無符合條件的學校</p>
          <p className="text-base">請嘗試調整您的搜尋條件，或確認輸入的資訊是否正確。</p>
        </div>
      )}

      {/* Disclaimer */}
      {showDisclaimer && (
        <div className="bg-blue-50 border-l-8 border-blue-500 text-blue-800 p-6 rounded-xl shadow-md w-full max-w-3xl mt-8">
          <p className="font-bold text-lg mb-2">重要提醒：</p>
          <p className="text-base">
            本預估器是根據您提供的歷年數據（110-113年）進行分析（不含作文成績），結果僅供參考。
            實際錄取情況會因當年考題難易度、考生表現、志願序、招生政策等因素而有所變動。
            積點數據在某些年度或特定群科可能缺失，程式會使用有資料的年度進行比對。
            建議您在填寫志願時，務必參考當年度官方公布的招生簡章及其他升學輔導資訊。
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
