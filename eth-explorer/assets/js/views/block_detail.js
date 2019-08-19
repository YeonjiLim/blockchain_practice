// 실제 Vue 템플릿 코드 작성 부분
$(function(){
    var blockNumber = parseQueryString()['blockNumber'];
    
    var detailView = new Vue({
        el: '#block-detail',
        data: {
            isValid: true,
            block: {
                number: 0
            }
        },
        mounted: function(){
            if(blockNumber) {
               // TODO 
            } else {
                this.isValid = false;
            }
        }
    });
});