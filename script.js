let correctChoices = 0; // Biến đếm số lựa chọn đúng

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var trashId = data;

    // Kiểm tra xem người dùng có thả rác vào thùng đúng không
    if ((trashId === 'vegetable' && event.target.id === 'organic') ||
        (trashId === 'can' && event.target.id === 'recycle') ||
        (trashId === 'bottle' && event.target.id === 'inorganic')) {
        
        // Phát âm thanh khi trả lời đúng
        document.getElementById('correctSound').play();
        
        // Hiển thị thông báo "Chúc mừng bạn đã làm đúng!"
        var message = document.getElementById('message');
        message.innerText = "👏 Chúc mừng bạn đã làm đúng!";
        message.style.display = 'block'; // Hiện thông báo
        message.style.opacity = '1'; // Đặt độ mờ thành 1 để hiển thị

        // Ẩn hình ảnh rác
        document.getElementById(trashId).style.display = 'none';
        correctChoices++;
        
        // Kiểm tra xem đã chọn đúng 3 rác chưa
        if (correctChoices === 3) {
            endGame(); // Gọi endGame ngay lập tức
        }

        // Ẩn thông báo sau 2 giây
        setTimeout(() => {
            message.style.opacity = '0'; // Thiết lập độ mờ về 0 để ẩn thông báo
        }, 1300);
    } else {
        // Phát âm thanh khi trả lời sai
        document.getElementById('wrongSound').play();
        showErrorMessage("Bạn đã chọn sai thùng rác!");
    }
}

function showErrorMessage(text) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerText = text;
    errorMessage.style.display = 'block'; // Hiện thông báo lỗi
    errorMessage.style.opacity = '1'; // Đặt độ mờ thành 1 để hiển thị

    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
        errorMessage.style.opacity = '0'; // Thiết lập độ mờ về 0 để ẩn thông báo
    }, 2000);
}

function endGame() {
    // Ẩn tất cả thùng rác
    const binElements = document.querySelectorAll('.bin');
    binElements.forEach(bin => {
        bin.style.display = 'none'; // Ẩn thùng rác
    });
    
    // Hiện thông báo hoàn thành ngay lập tức
    var message = document.getElementById('message');
    message.innerText = "🎉 Chúc mừng! Bạn đã hoàn thành trò chơi!";
    
    // Hiện thông báo sau khi đã ẩn thùng rác
    message.style.display = 'block'; // Hiện thông báo
    message.style.opacity = '1'; // Đặt độ mờ thành 1 để hiển thị

    // Ngăn không cho kéo thả thêm
    const trashElements = document.querySelectorAll('.trash');
    trashElements.forEach(trash => {
        trash.setAttribute('draggable', 'false');
    });
    
    binElements.forEach(bin => {
        bin.ondrop = null; // Vô hiệu hóa drop
        bin.ondragover = null; // Vô hiệu hóa dragover
    });
}
