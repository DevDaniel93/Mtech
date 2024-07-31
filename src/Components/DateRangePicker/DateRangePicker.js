import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import $ from 'jquery';
import moment from 'moment';
import 'bootstrap-daterangepicker';

const DateRangePicker = ({ onDateChange }) => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    const start = moment().subtract(29, 'days');
    const end = moment();

    function cb(start, end) {
      $(datePickerRef.current).find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      if (onDateChange) {
        onDateChange({ start, end });
      }
    }

    $(datePickerRef.current).daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, cb);

    cb(start, end);

  }, [onDateChange]);

  return (
    <div id="reportrange" ref={datePickerRef} className="pull-left" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc' }}>
      <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
      <span></span> <b className="caret"></b>
    </div>
  );
};

export default DateRangePicker;
