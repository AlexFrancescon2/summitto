
// Create class Invoice
class Invoice {
  constructor(filename, totalGrossAmount, vatRate, refundable, refundedPercentage, currency) {
    this.filename = filename;
    this.totalGrossAmount = totalGrossAmount;
    this.vatRate = vatRate;
    this.refundable = refundable;
    this.refundedPercentage = refundedPercentage;
    this.currency = currency;
  }
}

// Handle tesseract js - recognize 
recognize = async ({ target: { files }  }) => {
  if (!files) {
    // User cancelled the request; nothing happens;
    return false;
  }
  if (!files[0].type.includes('image')) {
    // Display error message
    var html = getHTMLExtensionErrorTemplate(); 
    $('.loader-wrapper').removeClass('loaded');
    $('#modal-wrapper').html(html);
    $('#invoiceModal').modal('show'); 
    return false;
  }
  // Init loader
  $('.loader-wrapper').addClass('loaded');
  const tesseractResponse = await Tesseract.recognize(files[0], 'eng', {
    corePath: 'node_modules/tesseract.js-core/tesseract-core.wasm.js',
    //logger: m => console.log(m),
  });
  handleTesseractResponse(tesseractResponse.data, files[0]);

}

// Init invoice var
var invoices = [];
  
// On page load
$(function () {
  // fire recognizer
  $('#uploader').on('change', recognize);
});

// Get Invoices objects
function getRegisteredInvoices() {
  return invoices;
}

// Add invoice
function addInvoice(invoiceDetails) {
  var invoice = new Invoice(
    invoiceDetails.filename, 
    invoiceDetails.totalGrossAmount, 
    invoiceDetails.totalTax, 
    invoiceDetails.refundable,
    invoiceDetails.refundPercentage,
    invoiceDetails.currency
  );
  invoices.push(invoice);
  displayInvoices(invoices);
}

// Get Html invoices template
function getHTMLInvoiceTemplate(invoice) {
  var fileNameAry = invoice.filename.split('.');
  var fileExtension = fileNameAry[fileNameAry.length -1];
  var filename = invoice.filename.length > 15 ? invoice.filename.slice(0, 15) +  '...' + fileExtension : invoice.filename;
  var refundable = invoice.refundable ? 'Refunded' : 'Not refunded';
  var html = '<button class="collapsible">' +
                '<div class="d-flex justify-content-between">' +
                  '<span class="filename">' + filename + '</span>' + 
                  '<span>' +
                    '<span class="status" data-status="' + invoice.refundable + '">' + refundable + '</span>' + 
                    '<span class="toggle ml-2">' +
                      '<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>' +
                    '</span>'+ 
                  '</span>' + 
                '</div>' +
              '</button>' +
              '<div class="content">' + 
              '<div class="py-3">' + 
              '<p class="mb-0">Total amount: ' + invoice.currency + ' ' + invoice.totalGrossAmount + '</p>';
  if (invoice.refundable) {
    var refundedAmount = ((invoice.totalGrossAmount * invoice.refundedPercentage) / 100).toFixed(2);
    html +=   '<p class="mb-1">Refunded percentage: ' + invoice.refundedPercentage + '%</p>' + 
              '<p class="mb-0 font-weight-bold">Refunded amount: ' + invoice.currency + ' ' + refundedAmount + '</p>';
  }
  html +=       '</div>' + 
              '</div>';
  return html;
}

// Get Html modal template
function getHTMLModalTemplate(file, invoiceDetails) {
  var html = '<div class="modal fade" id="invoiceModal" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-lg" role="document">'+ 
                '<div class="modal-content">'+
                  '<div class="modal-header">' +
                    '<h5 class="modal-title">Register your invoice!</h5>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                      '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                  '</div>' +
                  '<div class="modal-body">'+
                    '<div class="row">'+
                      '<div class="col-12">'+
                        '<p class="text-break mb-4">' +
                          '<span><svg style="width:18px;height:18px;margin-bottom:6px;margin-right:4px;" viewBox="0 0 24 24"><path fill="currentColor" d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" /></svg></span>' +
                          'File uploaded: <span class="file-name">' + file.name + '</span>' +
                        '</p>' +
                      '</div>'+
                      '<div class="col-12 col-lg-6">'+
                        '<p class="subtitle mb-2">Invoice\'s informations:</p>' +
                        '<p class="mb-1">Net amount: ' + invoiceDetails.currency + ' ' + invoiceDetails.netAmount + '</p>' +
                        '<p class="mb-1">Total Tax: ' + invoiceDetails.totalTax + '%</p>' +
                        '<p class="mb-1 font-weight-bold">Total Amount: ' + invoiceDetails.currency + ' ' + invoiceDetails.totalGrossAmount + '</p>' +
                      '</div>'+
                      '<div class="col-12 col-lg-6 mt-4 mt-lg-0">'+
                        '<div class="row">' +
                          '<div class="col-12">' +
                            '<p class="mb-1">Would you like to refund your invoice?</p>' +
                            '<div class="form-check form-check-inline">' +
                              '<input class="radioYes" name="refundGroup" type="radio" id="radioYes" checked>' + 
                              '<label for="radioYes">Yes</label>' + 
                            '</div>' + 
                            '<div class="form-check form-check-inline">' +
                              '<input class="radioNo" name="refundGroup" type="radio" id="radioNo">' + 
                              '<label for="radioNo">No</label>' + 
                            '</div>' + 
                          '</div>' + 
                          '<div class="col-12 form-wrapper">' +
                            '<label for="percentage" class="mb-1 small">Enter the refund\'s percentage:</label>' + 
                            '<div class="input-group input-group-sm mb-3">' +
                              '<div class="input-group-prepend">' +
                                '<span class="input-group-text">%</span> ' +
                              '</div>' + 
                              '<input type="number" step="0.1" min="0.1" max="100" id="percentage" class="form-control" placeholder="Percentage" aria-label="Percentage" aria-describedby="percentage">' +
                            '</div>' +
                            '<p class="mb-0 font-weight-bold refund-percentage-wrapper d-none">Refund amount: <span id="refund-percentage"></span></p>' + 
                            '<p class="mb-0 text-danger" id="errors"></p>' + 
                          '</div>' +
                        '</div>' +
                      '</div>'+
                    '</div>'+
                    
                  '</div>' +
                  '<div class="modal-footer">' + 
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                    '<button type="button" class="btn btn-primary" id="add-invoice">Register</button>' + 
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>';
  return html;
}

// Get Html extension error modal template
function getHTMLExtensionErrorTemplate() {
  var html = '<div class="modal fade" id="invoiceModal" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-md" role="document">'+ 
                '<div class="modal-content error-modal-content">'+
                  '<div class="modal-header">' +
                    '<h5 class="modal-title">Extension not supported!</h5>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                      '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                  '</div>' +
                  '<div class="modal-body">'+
                    '<div class="row">'+
                      '<div class="col-12">'+
                        '<div class="d-flex justify-content-center align-items-center">'+
                          '<img src="assets/img/error.gif" alt="error" title="error" style="width: 150px;">' +
                        '</div>' +
                        '<p class="text-center">' +
                          'The extension of your file is not supported yet. <br>' +
                          'Try using one of the following extensions: <br>' +
                          '<span class="font-weight-bold">JPG</span>, <span class="font-weight-bold">PNG</span>, <span class="font-weight-bold">JPEG</span>' +
                        '</p>' +
                      '</div>'+
                    '</div>'+
                  '</div>' +
                  '<div class="modal-footer">' + 
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>';
  return html;
}

// Get Html generic error modal template
function getHTMLGenericErrorTemplate() {
  var html = '<div class="modal fade" id="invoiceModal" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-md" role="document">'+ 
                '<div class="modal-content error-modal-content">'+
                  '<div class="modal-header">' +
                    '<h5 class="modal-title">Unexpected error!</h5>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                      '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                  '</div>' +
                  '<div class="modal-body">'+
                    '<div class="row">'+
                      '<div class="col-12">'+
                        '<div class="d-flex justify-content-center align-items-center">'+
                          '<img src="assets/img/error.gif" alt="error" title="error" style="width: 150px;">' +
                        '</div>' +
                        '<p class="text-center">' +
                          '<span class="font-weight-bold">Whoops, we are sorry! Something went wrong. </span><br>' +
                          'Seems like we are unable to retreive your invoice\'s data. <br>' + 
                          'Just try again or provide a better quality invoice. <br> If the problem persists, contact the technical service.' +
                        '</p>' +
                      '</div>'+
                    '</div>'+
                  '</div>' +
                  '<div class="modal-footer">' + 
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>';
  return html;
}

// Add event listener to every collapser
function attachCollapser() {
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
        $(this).find('.toggle').html('<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>');
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        $(this).find('.toggle').html('<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>');
      } 
    });
  }
}

// Display invoices in the DOM
function displayInvoices(invoices) {
  var html = '';
  invoices.forEach(element => {
     html += getHTMLInvoiceTemplate(element);
  });
  $('#registered-invoices').html(html);
  attachCollapser();
}

// Handle tesseract response
function handleTesseractResponse (package, file) {
  // Extrapolate currency and totals
  /*  Assumption TOTAL
  - Must have a currency on the line
  - Must have higher than the other floats
  - Must contain one of the cathc words
  */
  var totalGrossAmount = 0;
  var totalGrossAmountCatchWords = ['total', 'tax', 'due', 'balance'];
  var totalGrossAmountLeaveWords = ['days', 'date', 'payment'];
  var totalTax = 0;
  var totalTaxCatchWords = ['%', ' %'];
  var totalTaxCatchPreWords = ['(', ')', ' '];
  var currencies = ['$', '€'];
  var totalCurrency = '';
  var text = package.text;
  var htmlText = '';
  var paragraphs = package.paragraphs;
  if (!paragraphs) {
    // Return error message
    var html = getHTMLGenericErrorTemplate(); 
    $('#modal-wrapper').html(html);
    $('#invoiceModal').modal('show'); 
    $('.loader-wrapper').removeClass('loaded');
    return false;
  }
  paragraphs.forEach((paragraph)=>{
    var lines = paragraph.lines;
    if (!lines) {
      var html = getHTMLGenericErrorTemplate();
      $('#modal-wrapper').html(html);
      $('#invoiceModal').modal('show'); 
      $('.loader-wrapper').removeClass('loaded');
      return false;
    }
    lines.forEach((line)=>{
      if (!line) {
        var html = getHTMLGenericErrorTemplate();
        $('#modal-wrapper').html(html);
        $('#invoiceModal').modal('show'); 
        $('.loader-wrapper').removeClass('loaded');
        return false;
      }
      // save html for future uses
      htmlText += '<p>' + line.text + '</p>';
      // Get TotalAMount
      if (totalGrossAmountCatchWords.some(function(v) { 
        return line.text.toLowerCase().indexOf(v) >= 0; 
      }) && totalGrossAmountLeaveWords.some(function(w) { 
        return line.text.toLowerCase().indexOf(w) < 0; 
      }) && currencies.some(function(c) { 
        return line.text.toLowerCase().indexOf(c) >= 0; 
      })) {
        var float = Number(line.text.replace(/[^0-9\.]+/g,""));
        if (float > totalGrossAmount) {
          totalGrossAmount = float.toFixed(2);
          currencies.forEach(currency => {
            if (line.text.includes(currency)) {
              totalCurrency = currency;
            }
          });
        }
      }

      // Get Tax Ratio
      if (totalTaxCatchWords.some(function(v) { 
        return line.text.toLowerCase().indexOf(v) >= 0; 
      })) {
        // Apply regext to extract percentage
        totalTaxCatchWords.forEach(function(catchWord) {
          totalTaxCatchPreWords.forEach(function(catchPreWord) {
            var substring = line.text.split(catchPreWord).pop().split(catchWord)[0];
            var float = Number(substring.replace(/[^0-9\.]+/g,""));
            if (float && float > 0 && float <= 100) {
              totalTax = parseFloat(float.toFixed(2));
              return;
            }
          });
        });
      }
    });
  });

  if (!totalCurrency || !totalTax || !totalGrossAmount) {
    // Return error 
    var html = getHTMLGenericErrorTemplate();
    $('#modal-wrapper').html(html);
    $('#invoiceModal').modal('show'); 
    $('.loader-wrapper').removeClass('loaded');
    return false;

  }

  // Calculate derivate data
  var netAmount = ((100*totalGrossAmount)/(100+totalTax)).toFixed(2);

  // Set object with invoice details
  var invoiceDetails = {
    filename: file.name,
    currency: totalCurrency,
    totalTax: totalTax,
    totalGrossAmount: parseFloat(totalGrossAmount),
    text: text,
    htmlText: htmlText,
    netAmount: netAmount
  }

  // Get Modal template
  var html = getHTMLModalTemplate(file, invoiceDetails);
  // Remove loader
  $('.loader-wrapper').toggleClass('loaded');
  $('#modal-wrapper').html(html);
  $('#invoiceModal').modal('show'); 

  // Handle listener for checkboxes
  $('input[name="refundGroup"]').on('change', function() {
    if($(this).hasClass('radioYes')) {
      if ($(this).prop('checked')) {
        $('.form-wrapper').show(300);
      } 
    } else {
      $('.form-wrapper').hide(300);
    }
  });

  // Handle listener for percentage
  $('#percentage').on('change', function() {
    // Make sure users put max 2 decimals
    var value = parseFloat($(this).val());
    if (value && value > 0 && value <= 100) {
      $(this).val(parseFloat($(this).val()).toFixed(2));
      $('#errors').empty();
      // Set value
      var newValue = ((totalGrossAmount * value) / 100).toFixed(2);
      $('#refund-percentage').html(totalCurrency + ' ' + newValue);
      $('.refund-percentage-wrapper').removeClass('d-none');
      $('#add-invoice').prop("disabled", false);
    } else {
      // show error
      $('#errors').html('Please enter a valid value!');
      $('.refund-percentage-wrapper').addClass('d-none');
      $('#add-invoice').prop("disabled", true);
    }
  });

  // Add invoice
  $('#add-invoice').on('click', function() {
    // Validate data
    var value = parseFloat($('#percentage').val());
    var refundable = false;
    if ($('#radioYes').prop('checked')) {
      var refundable = true;
      if (!value || value <= 0 || value > 100) {
        $('#errors').html('Please enter a valid value!');
        $('.refund-percentage-wrapper').addClass('d-none');
        $('#add-invoice').prop("disabled", true);
        return false;
      }
    } 

    // Add new proprierties
    invoiceDetails.refundPercentage = value;
    invoiceDetails.refundable = refundable;

    // Add invoice
    addInvoice(invoiceDetails);
    $('#invoiceModal').modal('hide');
  });
}







