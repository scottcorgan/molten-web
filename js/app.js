(function summary () {
  var Summary = {
    triggers: [],
    
    $window: $(window),
    $sectionsWrapper: $('.sections-wrapper'),
    $sections: $('.section'),
    $nav: $('.main > nav'),
    $navWrapper: $('.main > nav > ul'),
    navWrapperOuterHeight: 0,
    
    init: function () {
      this.$sections.each(this.sectionSetup);
      this.$sectionsWrapper.on('scroll', this.sectionsScroll);
      this.$window.on('resize', this.positionNav);
      this.positionNav();
      this.$sectionsWrapper.trigger('scroll');
    }
  };
  
  Summary.positionNav = function () {
    Summary.$navWrapper.css('top', Summary.$nav.outerHeight()/2 - Summary.navWrapperOuterHeight/2);
  };
  
  Summary.sectionSetup = function (idx, el) {
    var $el = $(el);
    var href = '#' + $el.attr('id');
    var $navItem = $('<li><a href="' + href + '">' + $el.attr('title') + '</a></li>');
    var $clickable = $navItem.find('a');
    
    Summary.triggers.push(href);
    
    $clickable.on('click', function (e) {
      e.preventDefault();
      Summary.$sectionsWrapper.scrollTo(href);
    });
    
    Summary.$navWrapper.append($navItem);
    Summary.navWrapperOuterHeight = Summary.$navWrapper.outerHeight();
  };
  
  Summary.sectionsScroll = function() {
    var $content = Summary.$sectionsWrapper;
    var $activeLi = $('#navbar .nav li.active');
    if ($content.scrollTop() < 100) {
      $activeLi.removeClass('active');
      $('#navbar a[href=#download]').parent().addClass('active');
    }
    else if ($content.scrollTop() >= ($content[0].scrollHeight-780)) {
      $activeLi.removeClass('active');
      $('#navbar a[href=#browser-support]').parent().addClass('active');
    }
    else{
      $.each(Summary.triggers, function (idx, elId) {
        var top = $(elId).offset().top;
        
        if (top > 0 && top < 200) {
          $activeLi.removeClass('active');
          $('#navbar a[href=' + elId + ']').parent().addClass('active');
        }
      });
    }
  };
  
  Summary.init();
}());