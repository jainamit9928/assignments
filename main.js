window.TA = window.TA || {};

TA.DynamicTable = (function () {
    var worker = new Worker('/js/worker.js');

    function DynamicTable(input, output) {
        this.$input = $(input);
        this.$output = $(output);
        this.initDOMEvents();
        this.createTable(this.$input);
    }

    DynamicTable.prototype.initDOMEvents = function() {
        this.$input.find('.range-field-pair').off('change').on('change', 'input', (function(event) {
            _handleInputChng($(event.target));
        }).bind(this));

        this.$input.off('submit').on('submit', (function(event) {
            event.preventDefault();
            this.createTable($(event.target));
        }).bind(this));
    }

    DynamicTable.prototype.createTable = function($elm) {
        var rows = parseInt($elm.find('.row-value').val());
        var cols = parseInt($elm.find('.col-value').val());
        _renderTableHTML(rows, cols, this.$output);
    }

    function _handleInputChng($elm) {
        $elm
        .closest('.range-field-pair')
        .find('input')
        .not($elm)
        .val($elm.val());
    }    

    function _renderTableHTML(rows, cols, $output) {
        worker.postMessage({ rows: rows, cols: cols });
        worker.onmessage = function(event) {
            $output.html(event.data);
            _styleTable(cols, $output);
        };
    }

    function _styleTable(cols, $output) {
        var width = (100 / cols) + '%';
        $output.find('.table-col').css('width', width);
    }

    return DynamicTable;
})();

var dynamicTable = new TA.DynamicTable('.form-input', '.table-preview');