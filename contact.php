<?php
header('Content-Type: text/plain');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $business = filter_var(trim($_POST['business']), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Validación
    if (empty($name) || empty($email) || empty($business) || empty($message)) {
        http_response_code(400);
        echo "Por favor, completa todos los campos.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor, ingresa un correo electrónico válido.";
        exit;
    }

    // Aquí puedes agregar lógica para enviar un correo o guardar en una base de datos
    // Ejemplo con PHPMailer (descomentar y configurar si tienes PHPMailer instalado):
    /*
    require 'vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    $mail = new PHPMailer;
    $mail->setFrom($email, $name);
    $mail->addAddress('tu_correo@dominio.com');
    $mail->Subject = 'Nuevo mensaje de contacto';
    $mail->Body = "Negocio: $business\nMensaje: $message";
    if ($mail->send()) {
        echo "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
    } else {
        http_response_code(500);
        echo "Error al enviar el mensaje.";
    }
    */

    // Respuesta por defecto
    http_response_code(200);
    echo "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
}
?>