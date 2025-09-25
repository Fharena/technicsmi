// EmailJS 설정
// https://www.emailjs.com에서 계정을 만들고 실제 값으로 교체해주세요

export const EMAILJS_CONFIG = {
  // EmailJS Public Key (Account > General 섹션에서 확인)
  PUBLIC_KEY: 'DJrEBKY-o7rGPgtmg',
  
  // EmailJS Service ID (Email Services 섹션에서 생성)
  SERVICE_ID: 'service_r9f8dru',
  
  // EmailJS Template ID (Email Templates 섹션에서 생성)
  TEMPLATE_ID: 'template_znf67f2',
  
  // 받는 사람 이메일
  TO_EMAIL: 'TCSWORKIN@gmail.com'
};

// EmailJS 설정 가이드:
// 1. https://www.emailjs.com에 가입
// 2. Email Services에서 Gmail/Outlook 등 연결
// 3. Email Templates에서 템플릿 생성 (변수: {{from_name}}, {{from_email}}, {{message}})
// 4. 위의 설정값들을 실제 값으로 교체
