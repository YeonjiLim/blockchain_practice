const NUMBER_OF_CONTENTS_TO_SHOW = 10;           // 한 번에 보여줄 정보의 개수
const REFRESH_TIMES_OF_TRANSACTIONS = 3000;     // 트랜잭션 정보 갱신 시간 3초

// 실제 Vue 템플릿 코드 작성 부분
$(function(){
    var txesView = new Vue({
        el: '#transactions',
        data: {
            transactions: []
        },
        methods: {
            fetchTxes: function(){
                // TODO 
            }
        },
        mounted: function(){
            this.fetchTxes();

            this.$nextTick(function () {
                window.setInterval(() => {
                    this.fetchTxes();
                }, REFRESH_TIMES_OF_TRANSACTIONS);
            })
        }
    });
});