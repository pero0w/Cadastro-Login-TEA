<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro de conexão"]));
}

$data = json_decode(file_get_contents("php://input"));

$nome = $conn->real_escape_string($data->nome);
$email = $conn->real_escape_string($data->email);
$senha = password_hash($data->senha, PASSWORD_DEFAULT);
if (isset($data->area)) {
    $tipo_definido = 'profissional';
} else {
    $tipo_definido = 'responsavel';
}
$tipo = $conn->real_escape_string($tipo_definido);
$area = isset($data->area) ? $conn->real_escape_string($data->area) : '';
$instituto = isset($data->instituto) ? $conn->real_escape_string($data->instituto) : '';

$sql = "INSERT INTO usuarios (nome, email, senha, tipo, area, instituto) VALUES ('$nome', '$email', '$senha', '$tipo', '$area', '$instituto')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Usuário cadastrado"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $conn->error]);
}

$conn->close();
?>
