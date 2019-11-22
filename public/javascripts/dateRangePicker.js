$(function() {
    $('input[name="dates"]').daterangepicker({
        opens: 'left',
        locale:{
        format:'YYYY/MM/DD'
        }
    }, function(start, end, label) {
        console.log('setting the date' + start.format('YYYYMMDD') + 'to' + end.format('YYYYMMDD'));
    });
});