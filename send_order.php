<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $fullName = $_POST['fullName'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $cleaningType = $_POST['cleaningType'];
    $time = $_POST['time'];

    // Формируем сообщение
    $subject = "Новая заявка на уборку";
    $message = "ФИО: $fullName\n";
    $message .= "Телефон: $phone\n";
    $message .= "Адрес: $address\n";
    $message .= "Тип уборки: $cleaningType\n";
    $message .= "Время: $time\n";

    // Указываем email, на который будет отправлено письмо
    $to = "nikituxa111@gmail.com"; // Замените на ваш email

    // Заголовки письма
    $headers = "From: no-reply@example.com\r\n";
    $headers .= "Reply-To: no-reply@example.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        echo "Заявка успешно отправлена!";
    } else {
        echo "Ошибка при отправке заявки.";
    }
} else {
    echo "Некорректный метод запроса.";
}
?>