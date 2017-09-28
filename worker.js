this.onmessage = function (event) {
    var rows = event.data.rows;
    var cols = event.data.cols;
    var outerList = '';
    for (var row = 0; row < rows; row++) {
        var innerList = '';
        for (var col = 0; col < cols; col++) {
            innerList += '<li class="table-col"></li>';
        }
        outerList += '<li class="table-row"><ul>' + innerList + '</ul></li>';
    }
    
    this.postMessage('<ul>' + outerList + '</ul>');
}