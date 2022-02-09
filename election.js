function abc(sdName){
    $.ajax({
        type:'GET',
        url:`https://lee0209.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=WeN9tcbukHPNtjJiUNXkIN3MwHw%2Fcezfe%2BBCd2goc8%2Bq1%2BVy1mGDxxAQrAcWZDbdIyRxth6RR4%2BVovNOz22G2A%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType:'xml',
        beforeSend:function(){
            $('#content').append('<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i></div>')
        },
        complete:function(){
            $('#content .loading').remove()
        },
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText) 
        },

    })
}
abc('서울특별시')

function usedata(data){
      var elem = `<ul class="placeList">`
    $(data).find('item').each(function(){
        var placeName = $(this).find('placeName').text()
        var addr = $(this).find('addr').text()
        elem += `<li>`
        elem += `<p>${placeName}</p>`
        elem += `<p>${addr}</p>`
        elem += `</li>`
    })
    elem += `</ul>`
    $('#content').append(elem)
}

$('#content .tabTit li').on('click', function(){
    var cityName = $(this).text()
    $('#content .placeList').remove()
    abc(cityName)
})