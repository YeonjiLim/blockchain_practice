// 실제 Vue 템플릿 코드 작성 부분
$(function(){
    var hash = parseQueryString()['hash'];
    
    var detailView = new Vue({
        el: '#tx-detail',
        data: {
            isValid: true,
            tx: {
                hash: "-",
                timestamp: "-"
            }
        },
        mounted: function(){
            if(hash) {
               // TODO
                web3.eth.getTransaction (hash).then(res => (
                    this.tx.hash = res['hash'],
                    this.tx.block = res['blockNumber'],
                    this.tx.from = res['from'],
                    this.tx.to = res['to'],
                    this.tx.value = res['value'],
                    this.tx.gas = res['gas'],
                    this.tx.gasPrice = res['gasPrice']
                ));

                web3.eth.getTransaction(hash).then(res => web3.eth.getBlock(res['blockNumber']).then(res =>
                    this.tx.timestamp = (new Date((res['timestamp'] * 1000)))
                ))
            } else {
                this.isValid = false;
            }
        }
    });
});