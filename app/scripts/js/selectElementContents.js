function selectElementContents(el) {
        var body = document.body, range, sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
                document.execCommand('copy');
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
            range.execCommand('copy');
        }
    }

    function generatePdf () {
            var
             form = $('#PDF'),
             cache_width = form.width(),
             a4 = [595.28, 841.89];  // for a4 size paper width and height
             
             $('body').scrollTop(0);
             createPDF();
            //create pdf
            function createPDF() {
                getCanvas().then(function (canvas) {
                    var
                    doc = new jsPDF({
                        unit: 'px',
                        format: 'a4'
                    });
                    doc.addHTML(document.body, function() {
                        doc.save('ReporteInventarioSegunda.pdf');
                        form.width(cache_width);
                    });
                });
            }

            // create canvas object
            function getCanvas() {
                //form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
                return html2canvas(form, {
                    removeContainer: true
                });
            }
        }