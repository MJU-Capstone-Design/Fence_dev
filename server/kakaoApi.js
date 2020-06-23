// String regionName = HttpConnectUtil.encodeString("카카오프렌즈");
// String query = "query=" + regionName;

// KakaoRestAPI api = KakaoRestAPI
//         .builder("KKKKKKKKKKKKKKKKKKKKKK")
//         .setRestAPIType(KakaoRestAPIType.SearchingByKeword)
//         .setParameter(query)
//         .build();

// KakaoRestAPIExecutor executor = new KakaoRestAPIExecutor(api);
// executor.start();


// // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
// var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = {
//         center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };  

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 
// 키워드로 장소를 검색합니다
ps.keywordSearch('이태원 맛집', placesSearchCB); 
// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    for (var i=0; i<data.length; i++) {
      console.log(data);
      // bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }       

  } 
}