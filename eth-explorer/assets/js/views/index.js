const NUMBER_OF_CONTENTS_TO_SHOW = 3;           // 한 번에 보여줄 정보의 개수
const REFRESH_TIMES_OF_OVERVIEW = 1000;         // 개요 정보 갱신 시간 1초
const REFRESH_TIMES_OF_BLOCKS = 5000;           // 블록 정보 갱신 시간 5초
const REFRESH_TIMES_OF_TRANSACTIONS = 3000;     // 트랜잭션 정보 갱신 시간 3초


// 실제 Vue 템플릿 코드 작성 부분
$(function(){
    var dashboardOverview = new Vue({
        el: '#dashboard-overview',
        data: {
            latestBlock: 0,
            latestTxCount: 0
        },
        methods: {
            updateLatestBlock: function(){
                // TODO
                fetchLatestBlock().then(res => console.log(res));
                fetchLatestBlock().then(res => this.latestBlock = res);             
            },           
            updateLatestTxCount: function(){
                // TODO
                web3.eth.getBlockTransactionCount(this.latestBlock).then(res => this.latestTxCount = res);
            }
        },
        mounted: function(){
            this.$nextTick(function () {
                window.setInterval(() => {
                    this.updateLatestBlock();
                    this.updateLatestTxCount();
                }, REFRESH_TIMES_OF_OVERVIEW);
            });
        }
    });

    var blocksView = new Vue({
        el: '#blocks',
        data: {
            lastReadBlock: 0,
            blocks: []
        },
        methods: {
            fetchBlocks: function(){
                this.blocks = [];
                fetchLatestBlock().then(res => {
                    fetchBlocks(res - 9, res, data => {
                        var aJson = new Object();
                        aJson.timestamp = timeSince(data['timestamp']);
                        aJson.number = data['number'];
                        aJson.txCount = data['transactions'].length;
                        JSON.stringify(aJson);
                        this.blocks.unshift(aJson);
                    })
                })
            }
        },
        mounted: function(){
            this.fetchBlocks();

            this.$nextTick(function () {
                window.setInterval(() => {
                    this.fetchBlocks();
                }, REFRESH_TIMES_OF_BLOCKS);
            })
        }
    })

    var txesView = new Vue({
        el: '#transactions',
        data: {
            transactions: []
        },
        methods: {
            fetchTxes: function() {
                // TODO 최근 블록에 속한 10개의 트랜잭션 정보를 가져와서 계속 업데이트 한다.
                var that = this;
                this.transactions = [];
                fetchLatestBlock().then(res => web3.eth.getBlock(res).then(function (res) {
                    var size = res['transactions'].length;
                    if (res['transactions'].length > 10) {
                        size = 10;
                    } else {
                        size = res['transactions'].length
                    }
                    for (let i = 0; i < size; i++) {
                        var aJson = new Object();
        
                        aJson.timeSince = timeSince(res['timestamp']);
        
                        web3.eth.getTransaction(res['transactions'][i]).then(res => {
                            aJson.to = res['to'];
                            aJson.from = res['from'];
                            aJson.hash = res['hash'];
        
                            JSON.stringify(aJson);
                            that.transactions.unshift(aJson)
                        });
                    }
                }))
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