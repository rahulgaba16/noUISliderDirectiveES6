class SliderDirective {
  constructor() {
    'ngInject';
    let directive = {
      restrict: 'A',
      scope: {
        start: '@',
        step: '@',
        end: '@',
        bindModel: '=ngModel'
      },
      link: function (scope, element) {
        let slider = element[0];
        noUiSlider.create(slider, {
          start: scope.bindModel,
          step: parseFloat(scope.step || 1),
          range: {
            'min': parseFloat(scope.start),
            'max': parseFloat(scope.end)
          }
        });
        slider.noUiSlider.on('change', function () {
          let currentVal = Math.round(slider.noUiSlider.get());
          slider.noUiSlider.set(currentVal);
        });
        slider.noUiSlider.on('slide', function () {
          scope.$apply(function () {
            scope.bindModel = Math.round(slider.noUiSlider.get());
          });
        });
      }
    };
    return directive;
  }
}
export default SliderDirective;
