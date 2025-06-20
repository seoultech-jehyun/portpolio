const modal = document.getElementById('detailModal');
const modalContentArea = document.getElementById('modalContentArea');

async function openModal(detailPageUrl) {
    try {
        // detail.html 파일의 내용을 비동기적으로 불러옴
        const response = await fetch(detailPageUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text(); // HTML 내용을 텍스트로 받음

        // 모달 내용 영역에 불러온 HTML 삽입
        modalContentArea.innerHTML = htmlContent;

        // 모달 활성화 및 본문 스크롤 방지
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error loading detail page:', error);
        modalContentArea.innerHTML = '<p>디테일 페이지를 불러오는 데 실패했습니다.</p>';
        // 에러 발생 시에도 모달을 열 수는 있지만, 사용자에게 알림을 주는 것이 좋습니다.
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 본문 스크롤 허용
    modalContentArea.innerHTML = '로딩 중...'; // 모달 닫을 때 내용 초기화 (선택 사항)
}

// 오버레이 배경 클릭 시 모달 닫기
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});