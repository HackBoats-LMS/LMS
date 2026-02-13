import re
import os

files = [
    r'd:\hackathon1\LMS\lms\app\pages\ls\units\Unit1.tsx',
    r'd:\hackathon1\LMS\lms\app\pages\ls\units\Unit2.tsx',
    r'd:\hackathon1\LMS\lms\app\pages\ls\units\Unit3.tsx',
    r'd:\hackathon1\LMS\lms\app\pages\ls\units\Unit4.tsx',
    r'd:\hackathon1\LMS\lms\app\pages\ls\units\Unit5.tsx'
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the literal `n that was added
    content = content.replace(',`n      explanation: ""', ',\n      explanation: ""')
    
    # Also add explanation to any questions that don't have it yet
    content = re.sub(r'(correctAnswer:\s*\d+)(\s*\})', r'\1,\n      explanation: ""\2', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed all LS unit files")
