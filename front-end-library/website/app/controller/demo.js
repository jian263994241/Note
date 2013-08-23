define(function (require) {
    var temp = {
        banner: require('text!v/demo-banner.html')
    };

    var Img = Backbone.Model.extend({
        urlRoot:'app/model/',
        initialize:function(){
            this.listenTo(this,'change',function(){
                console.log(this.get('bannerImg'));
            });
        }
    });
    var banner1 = new Img({id:'banner.json'});


    var Imgs = Backbone.Collection.extend({
        model:Img
    })

    var bannerImgs = new Imgs([banner1]);

    var BannerView = Backbone.View.extend({
        el:"body",
        template:temp.banner,
        initialize:function(){
            this.model =  bannerImgs.models[0];
            this.listenTo(this.model,'change',this.render);
            this.model.fetch();
        },
        render:function(model){
            var data = model.get('bannerImg');
            var tempfn = doT.template(this.template);
            var html = tempfn({bannerImg:data});
            this.$el.html(html);
            this.addCarouFredSel();
        },
        addCarouFredSel:function(){
            require(['helper/jquery.carouFredSel'],function(){
                this.$('#demo').carouFredSel();
            })
        }
    });

    var app = new BannerView;
});