var drawingBoard = {
    init: function () {
        this.initDom();
        this.initData();
        this.draw();
        this.btnChange()
    },
    initDom: function () {
        this.oCavs = document.getElementsByTagName('canvas')[0];
        this.ctx = this.oCavs.getContext('2d');
        this.oBtnBox = document.getElementsByClassName('btnBox')[0];
        this.oColor = document.getElementById('color');
        this.oEraser = document.getElementById('eraser');
        this.oRange = document.getElementById('range');
    },
    initData: function () {
        this.cavsH = this.oCavs.offsetHeight;
        this.cavsW = this.oCavs.offsetWidth;
        this.cavsL = this.oCavs.offsetLeft;
        this.cavsT = this.oCavs.offsetTop;
        this.imgArr = [];
        this.nowColor = '#000000';
        this.nowRange = 1;
    },
    draw: function () {
        this.oCavs.onmousedown = this.drawDown.bind(this);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    },
    drawDown: function (e) {
        var lastImg = this.ctx.getImageData(0, 0, this.cavsW, this.cavsH)
        this.imgArr.push(lastImg);
        this.ctx.beginPath();
        var realLeft = e.pageX - this.cavsL;
        var realTop = e.pageY - this.cavsT;
        this.ctx.moveTo(realLeft, realTop);
        document.onmousemove = this.drawMove.bind(this);
        document.onmouseup = this.drawEnd.bind(this);
    },
    drawMove: function (e) {
        this.ctx.lineTo(e.pageX - this.cavsL, e.pageY - this.cavsT);
        this.ctx.stroke();
    },
    drawEnd: function (e) {
        document.onmousemove = 'none';
        this.ctx.closePath();

    },
    btnChange: function () {
        var self = this;
        this.btnColor();
        this.btnRange();
        this.oBtnBox.onclick = function (e) {
            switch (e.target.id) {
                case 'clearScreen': self.btnClear();
                    break;
                case 'eraser': self.btnEraser();
                    break;
                case 'rescind': self.btnRescind();;
                    break;
            }
        }
    },
    btnColor: function () {
        var self = this;
        this.oColor.onchange = function () {
            self.nowColor = this.value;
            self.ctx.strokeStyle = self.nowColor;
        }
    },
    btnClear: function () {
        this.ctx.clearRect(0, 0, this.cavsW, this.cavsH)
    },
    btnEraser: function () {
        if (this.ctx.strokeStyle != '#ffffff') {
            this.oEraser.style.border = '1px solid #000';
            this.oEraser.style.backgroundColor = '#0ff';
            this.ctx.strokeStyle = '#ffffff';
        } else {
            this.oEraser.style.border = 'none';
            this.oEraser.style.backgroundColor = '#ff0';
            this.ctx.strokeStyle = this.nowColor;
        }

    },
    btnRescind: function () {
        if (this.imgArr.length > 0) {
            this.ctx.putImageData(this.imgArr.pop(), 0, 0)
        }
    },
    btnRange: function () {
        var self = this;
        this.oRange.onchange = function () {
            self.nowRange = this.value;
            self.ctx.lineWidth = self.nowRange;
        }
    }
}
drawingBoard.init()