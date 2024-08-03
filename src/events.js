import $ from 'jquery';

export class EventIn {

    constructor(element) {
        this.element = $(element);
        this.toogle = false;
        this.bdy = document.getElementsByTagName('body')[0];
        this.bkg = document.createElement('div');
        this.bkg.setAttribute('style', 'position:fixed;height:100%;width:100%;background-color:rgb(100,100,100);filter:opacity(0)');
        this.bkg.setAttribute
        this.bkg.setAttribute('id', 'bkgr');
        this.dv2 = document.createElement('div');
        this.dv2.setAttribute('id', 'dv2');
        //this.dv2.setAttribute('class', 'inner pnl-bd urlainer');
        this.win_scr_w = 300 / window.screen.width;
        this.win_scr_h = 450 / window.screen.height;
        this.pos_w = 50 - ((100 * this.win_scr_w) / 2);
        this.pos_h = 50 - ((100 * this.win_scr_h) / 2);
        this.dv2.setAttribute('style', 'z-index:1;position:fixed;left:' + this.pos_w + '%;top:' + this.pos_h + '%;border-radius:15px;width:300px;padding:15px;');
        this.iframe = document.createElement('iframe');
        this.iframe.setAttribute('width', '100%');
        this.iframe.setAttribute('height', '300px');
        this.iframe.setAttribute('style', 'border:none');
        this.dv2.append(this.iframe);
        this.btn = document.createElement('button');
        //btn.setAttribute('class', 'inner');
        this.btn.setAttribute('style', 'display:block;margin:auto;');
        this.btn.innerHTML = "Fechar";
        this.n = 0;
        this.stl2 = this.dv2.getAttribute('style');
        this.bkg_stl = this.bkg.getAttribute('style');
    }

    infoup(url) {
        this.element.on('click', () => {
            this.#transition(url);
        });
        return {
            color: (clr) => {
                if (this.dv2) {
                    this.dv2.setAttribute('style', (this.dv2.getAttribute('style') || '') + 'background-color:' + clr + ';');
                }
                if (this.btn) {
                    this.btn.setAttribute('style', (this.btn.getAttribute('style') || '') + 'background-color:' + clr + ';');
                }
                return this;
            }
        }
    }



    #transition = (url, fadeOut) => {
        fadeOut
            ? this.toogle = false
            : this.toogle = true;

        console.log('flag: ' + this.toogle);

        if (this.toogle) {
            this.dv2.append(this.btn);
            this.bdy.insertBefore(this.bkg, this.bdy.childNodes[0]);
            this.bdy.append(this.dv2);
            this.iframe.setAttribute('src', url);
            $(this.btn).on('click', () => {
                this.#transition(url, true);
            });
            const incr = () => {
                this.bkg = document.getElementById('bkgr');
                var rst = this.n * 0.1;
                var rstbk = ((this.n / 2) * 0.1);

                if (this.n < 10) {
                    this.n++;
                    this.stl2 = this.dv2.getAttribute('style');
                    this.dv2.setAttribute('style', this.stl2 + 'filter:opacity(' + rst + ');');
                    this.bkg.setAttribute('style', 'position:fixed;width:100%;height:100%;z-index:1;background-color:#000;filter:opacity(' + rstbk + ');');
                    setTimeout(incr, 2 ** ((this.n + 2) / 2));
                }
                else {
                    var stl = this.dv2.getAttribute('style');
                    this.dv2.setAttribute('style', stl + 'filter:opacity(1);');
                    //return this;
                }
            }
            incr();
        }
        else {
            this.n = 10;
            this.dv2 = document.getElementById('dv2');
            this.stl2 = this.dv2.getAttribute('style');
            this.bkg = document.getElementById('bkgr');
            this.bkg_stl = this.bkg.getAttribute('style');
            if (document.getElementById('dv2')) {
                console.log('here');
                const decr = () => {
                    var rst = this.n * 0.1;
                    var rstbk = ((this.n / 2) * 0.1);
                    if (this.n > 0) {
                        this.n--;
                        this.dv2.setAttribute('style', this.stl2 + 'filter:opacity(' + rst + ');');
                        this.bkg.setAttribute('style', this.bkg_stl + 'filter:opacity(' + rstbk + ');');
                        setTimeout(decr, 2 ** ((this.n + 2) / 2));
                    }
                    else {
                        this.bkg.remove();
                        this.dv2.remove();
                        //return this;
                    }
                }
                decr();
            }
        }
    }
}

export { EventIn as default }