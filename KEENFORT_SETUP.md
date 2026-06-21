# 🚀 Keenfort Landing Page - Setup Guide

## Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it "Keenfort Landing Page"
4. Create 5 tabs: Settings, Hero, Process, Reviews, Pricing

## Step 2: Populate Google Sheets

### Tab 1: Settings
```
company_name	tagline	email	phone	accent_color
Keenfort	Master English with Purpose	hello@keenfort.com	+1-800-KEENFORT	#1e3a8a
```

### Tab 2: Hero
```
headline	subheadline	cta_text	cta_link
Master English Like Never Before	Learn from expert instructors with personalized lessons tailored to your goals	Start Learning Today	#pricing
```

### Tab 3: Process
```
step	title	description	icon
1	Assess Your Level	We evaluate your current English proficiency and learning goals	📊
2	Personalized Learning Plan	Custom lessons tailored to your specific needs	🎯
3	Expert Instruction	Learn from experienced, certified English instructors	👨‍🏫
4	Practice & Feedback	Interactive exercises with detailed feedback	💪
5	Track Progress	Monitor your improvement with detailed analytics	📈
6	Achieve Fluency	Join thousands of graduates who've achieved their goals	🎓
```

### Tab 4: Reviews
```
name	title	text	rating
Sarah Johnson	Marketing Manager	Keenfort transformed my English skills in just 3 months!	5
Maria Garcia	Software Developer	The personalized lessons were exactly what I needed.	5
James Chen	Entrepreneur	Best investment I made for my career.	5
```

### Tab 5: Pricing
```
plan	price	currency	duration	features	cta	popular
Starter	29	$	per month	10 lessons per month;Grammar guides;Community access	Enroll Now	FALSE
Professional	79	$	per month	Unlimited lessons;1-on-1 coaching;Certificate	Enroll Now	TRUE
Premium	149	$	per month	Everything in Professional;Priority support;Career guidance	Enroll Now	FALSE
```

## Step 3: Publish Google Sheet

1. Click **File → Share**
2. Change to **"Anyone with the link"**
3. Copy your Sheet ID from URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

## Step 4: Update Environment Variables

1. Open `.env.local`
2. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
3. Save the file

## Step 5: Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your landing page!

## 📝 Important Notes

- Use TAB key to separate columns in Google Sheets
- Features column uses semicolon (;) as separator
- popular column should be TRUE/FALSE
- accent_color should be valid hex color (#1e3a8a)
- All sheets must have headers in Row 1
- Data starts from Row 2

## 🔧 Troubleshooting

- **"Google Sheet ID not configured"**: Check .env.local file
- **"Failed to fetch settings sheet"**: Make sure sheet is published and public
- **Empty data**: Verify column names match exactly (case-sensitive)
- **CSV parsing errors**: Check for extra spaces in cells

## 🚀 Deploy to Vercel

```bash
npm run build
vercel
```
