document.addEventListener('DOMContentLoaded', (event) => {
    const correctPasswords = ['Yui', 'Yuichiro', 'Reiko', 'Reikoh', 'Reko', 'Rekoh', 'Moriaki', 'Mamoru'];
    const passwordContainer = document.getElementById('password-container');
    const questionContainer = document.getElementById('question-container');
    const passwordInput = document.getElementById('password-input');
    const passwordButton = document.getElementById('password-button');
    const errorMessage = document.getElementById('error-message');

    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const question = document.getElementById('question');

    let noButtonClickCount = 0;

    const checkPassword = () => {
        const enteredPassword = passwordInput.value;
        if (correctPasswords.includes(enteredPassword)) {
            passwordContainer.style.display = 'none';
            questionContainer.style.display = 'block';
        } else {
            errorMessage.style.display = 'block';
            passwordContainer.classList.add('incorrect');
            setTimeout(() => {
                passwordContainer.classList.remove('incorrect');
            }, 500);
        }
    };

    passwordButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });

    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    yesButton.addEventListener('click', () => {
        fireConfetti();
        questionContainer.classList.add('fade-out');
        setTimeout(() => {
            if (noButtonClickCount == 0) {
                alert(`いぇい😉`);
            } else {
                alert(`${noButtonClickCount + 1}回目でOKするなら最初からしろよ`);
            }
            window.close();
        }, 1000);
    });

    noButton.addEventListener('click', () => {
        noButtonClickCount++;
        question.textContent = 'エラーが発生しました。時間をおいてから再度お試しください。';
        let currentFontSize = parseFloat(window.getComputedStyle(yesButton, null).getPropertyValue('font-size'));
        yesButton.style.fontSize = (currentFontSize + 10) + 'px';
        questionContainer.classList.add('shake');
        setTimeout(() => {
            questionContainer.classList.remove('shake');
        }, 500);
    });
});
