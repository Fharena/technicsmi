# EmailJS 컨택트 폼 설정 가이드

컨택트 폼에서 이메일 전송 기능을 활성화하려면 EmailJS 설정이 필요합니다.

## 1. EmailJS 계정 생성

1. [EmailJS 웹사이트](https://www.emailjs.com)에서 무료 계정을 생성하세요.

## 2. Email Service 연결

1. EmailJS 대시보드에서 **Email Services** 메뉴로 이동
2. **Add New Service** 클릭
3. Gmail, Outlook, 또는 다른 이메일 서비스 선택
4. 이메일 계정 연결 및 인증
5. **Service ID** 기록해두기

## 3. Email Template 생성

1. **Email Templates** 메뉴로 이동
2. **Create New Template** 클릭
3. 다음 내용으로 템플릿 설정:

```
Subject: 웹사이트 문의: {{from_name}}님으로부터

Content:
안녕하세요,

웹사이트를 통해 문의가 접수되었습니다.

보낸 사람: {{from_name}}
이메일: {{from_email}}

메시지:
{{message}}

답장하려면 이 이메일에 바로 답장하시면 됩니다.
```

4. **Template ID** 기록해두기

## 4. Public Key 확인

1. **Account** > **General** 메뉴로 이동
2. **Public Key** 확인 및 기록

## 5. 설정 파일 업데이트

`src/config/emailjs.config.ts` 파일을 열고 다음 값들을 교체하세요:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: "여기에_실제_Public_Key_입력",
  SERVICE_ID: "여기에_실제_Service_ID_입력",
  TEMPLATE_ID: "여기에_실제_Template_ID_입력",
  TO_EMAIL: "99yoonjoo@naver.com",
};
```

## 6. 테스트

1. 웹사이트의 컨택트 폼에서 메시지를 보내보세요.
2. 99yoonjoo@naver.com으로 이메일이 도착하는지 확인하세요.

## 무료 계정 제한

- 월 200개 이메일까지 무료
- 그 이상은 유료 플랜 필요

## 문제해결

- 이메일이 스팸 폴더에 있는지 확인
- EmailJS 대시보드에서 전송 로그 확인
- 브라우저 개발자 도구에서 에러 메시지 확인
