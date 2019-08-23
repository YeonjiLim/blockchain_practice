// 실제 Vue 템플릿 코드 작성 부분
$(function(){
    var blockNumber = parseQueryString()['blockNumber'];
    
    var detailView = new Vue({
        el: '#block-detail',
        data: {
            isValid: true,
            block: {
                number: 0,
                hash: '',
                timestamp: '',
                miner: '',
                difficulty: '',
                nonce: '',
                size: 0,
                gasLimit: 0,
                gasUsed: ''
            }
        },
        mounted: function(){
            if(blockNumber) {
               // TODO
               web3.eth.getBlock(blockNumber).then(res => (
                   this.block.number = res['number'],
                   this.block.hash = res['hash'],
                   this.block.timestamp = (new Date((res['timestamp'] * 1000))),
                   this.block.miner = res['miner'],
                   this.block.difficulty = res['difficulty'],
                   this.block.nonce = res['nonce'],
                   this.block.size = res['size'],
                   this.block.gasLimit = res['gasLimit'],
                   this.block.gasUsed = res['gasUsed']
               ));
            } else {
                this.isValid = false;
            }
        }
    });
});