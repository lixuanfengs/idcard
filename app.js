// 背景图片数组
const backgrounds = [
    'https://i.pinimg.com/736x/f8/2d/d2/f82dd23eeb14bf0f6e7e2e277779537a.jpg',
    'https://s1.locimg.com/2024/10/03/64362beca1b82.jpg',
    'https://img.picui.cn/free/2024/10/03/66fe7916a8400.jpg',
    'https://img.picui.cn/free/2024/10/03/66fe791704e9d.jpg',
    'https://cdn-fusion.imgcdn.store/i/2024/1adc3190250057db.jpg',
];
let currentBackgroundIndex = 0;
let newWindow = null;

// 切换背景功能，仅在新窗口作用
function changeBackground() {
    if (newWindow && !newWindow.closed) {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
        newWindow.document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
    }
}

// 生成学生证功能
function generateCard() {
    const schoolName = document.getElementById('schoolName').value;
    const schoolLogo = document.getElementById('schoolLogo').value;
    const studentPhoto = document.getElementById('studentPhoto').value || getRandomPhoto(); // 随机生成头像
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const major = document.getElementById('major').value;
    const enrollmentDate = document.getElementById('enrollmentDate').value;
    const graduationDate = document.getElementById('graduationDate').value;
    const template = document.getElementById('template').value;

    // 使用 fetch 加载模板文件
    fetch(`templates/${template}`)
        .then(response => response.text())
        .then(templateHtml => {
            // 用用户输入的数据替换模板中的占位符
            const filledTemplate = templateHtml
                .replace('{{schoolName}}', schoolName)
                .replace('{{schoolLogo}}', schoolLogo)
                .replace('{{studentPhoto}}', studentPhoto)
                .replace('{{name}}', name)
                .replace('{{studentId}}', studentId)
                .replace('{{major}}', major)
                .replace('{{enrollmentDate}}', enrollmentDate)
                .replace('{{graduationDate}}', graduationDate);

            // 打开新窗口并显示填充后的模板
            newWindow = window.open();
            newWindow.document.write(`
                <html>
                <head>
                    <title>学生卡</title>
                    <style>
                        body {
                            font-family: 'Noto Sans SC', sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-image: url('${backgrounds[currentBackgroundIndex]}');
                            background-size: cover;
                        }
                        .student-card {
                            width: 350px;
                            padding: 20px;
                            border: 2px solid #000;
                            border-radius: 10px;
                            text-align: center;
                            background-color: white;
                        }
                        .student-card img {
                            max-width: 100px;
                            height: auto;
                            margin-bottom: 20px;
                        }
                        /* 美化切换背景按钮 */
                        .switch-background-btn {
                            position: fixed;
                            top: 10px;
                            right: 10px;
                            background-color: #007bff;
                            color: #fff;
                            border: none;
                            padding: 0.5rem 1rem;
                            font-size: 1rem;
                            font-weight: bold;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }

                        .switch-background-btn:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    ${filledTemplate}
                    <button class="switch-background-btn" onclick="window.opener.changeBackground()">切换背景</button>
                </body>
                </html>
            `);
            newWindow.document.close();
        })
        .catch(error => {
            console.error('模板加载失败:', error);
        });
}

// 获取随机头像
function getRandomPhoto() {
    return 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70); // 随机头像API
}
