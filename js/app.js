(function summary () {
  var Summary = {
    _scrollFromTopPaddingFix: 100,
    _scrollHeightPaddingFix: $(document).height() + 50,
    
    triggers: [],
    $firstSection: null,
    $lastSection: null,
    
    $window: $(window),
    $sectionsWrapper: $('.sections-wrapper'),
    $sections: $('.section'),
    $nav: $('.main > nav'),
    $navWrapper: $('.main > nav > ul'),
    navWrapperOuterHeight: 0,
    
    init: function () {
      Summary.$sections.each(Summary.sectionSetup);
      
      Summary.$sectionsWrapper.on('scroll', Summary.sectionsScroll);
      Summary.$window.on('resize', Summary.positionNav);
      
      Summary.positionNav();
      Summary.$sectionsWrapper.trigger('scroll');
    }
  };
  
  Summary.positionNav = function () {
    Summary.$navWrapper.css('top', Summary.$nav.outerHeight()/2 - Summary.navWrapperOuterHeight/2);
  };
  
  Summary.sectionSetup = function (idx, el) {
    var $el = $(el);
    var elId = $el.attr('id');
    var href = '#' + elId;
    var $navItem = $('<li class="summary-' + elId + '""><a href="' + href + '">' + $el.attr('title') + '</a></li>');
    var $clickable = $navItem.find('a');
    
    Summary.triggers.push(elId);
    
    $clickable.on('click', function (e) {
      e.preventDefault();
      Summary.$sectionsWrapper.scrollTo(href);
    });
    
    if (idx === 0) Summary.$firstSection = $navItem;
    if (Summary.$sections.length - 1 === idx) Summary.$lastSection = $navItem;
    
    Summary.$navWrapper.append($navItem);
    Summary.navWrapperOuterHeight = Summary.$navWrapper.outerHeight();
  };
  
  Summary.sectionsScroll = function() {
    var $content = Summary.$sectionsWrapper;
    var $activeLi = $('#navbar .nav li.active');
    
    if ($content.scrollTop() < Summary._scrollFromTopPaddingFix) {
      $activeLi.removeClass('active');
      Summary.$firstSection.addClass('active');
    }
    else if ($content.scrollTop() >= ($content[0].scrollHeight - Summary._scrollHeightPaddingFix)) {
      $activeLi.removeClass('active');
      Summary.$lastSection.addClass('active');
    }
    else{
      $.each(Summary.triggers, function (idx, elId) {
        var elOffsetTop = $('#' + elId).offset().top;
        
        if (elOffsetTop > 0 && elOffsetTop < 200) {
          $activeLi.removeClass('active');
          $('li.summary-' + elId).addClass('active');
        }
      });
    }
  };
  
  Summary.init();
}());