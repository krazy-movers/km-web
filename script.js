async function sendForm() {
  // 送信ボタンを無効化
  const submitBtnElement = document.querySelector('input[type=submit]');
  submitBtnElement.disabled = true;

  // メッセージを更新
  const messageElement = document.getElementById('message');
  messageElement.textContent = '送信中...';

  // reCAPTCHA による検証を実行
  const token = await grecaptcha.execute('6LcmPnMqAAAAAGqRReD710SZAqR7gcfcL0YJ4uOX', {
    action: 'submit',
  });

  // フォームデータに reCAPTCHA のトークンを追加
  const formData = new FormData(document.getElementById('inquiry-form'));
  formData.append('g_recaptcha_response', token);

  // フォームデータをバックエンドへ送信
  let req;
  try {
    req = await fetch(
      'https://us-central1-recaptchatest-440109.cloudfunctions.net/functionReCAPTCHA',
      {
        method: 'POST',
        body: new URLSearchParams(formData),
      }
    );
  } catch (e) {
    // エラー処理
    messageElement.textContent = 'エラーが発生しました';

    // 送信ボタンを有効化
    submitBtnElement.disabled = false;
    return;
  }

  // // レスポンスを受け取り、画面に表示
  // messageElement.textContent = await req.text();
  const response = await req;
  if (response.ok) {
    window.location.href = './thanks.html';
  } else {
    messageElement.textContent = await req.text();
  }

  // 送信ボタンを有効化
  submitBtnElement.disabled = false;
}
