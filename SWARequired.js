app.custom.formTasks.add('SoftwareAsset', null, function (formObj, viewModel) {
    const boolProp = "CustomBool"
    const contingentProps = ["CustomEnum", "CustomDate"]
    
    const requiredText = localizationHelper.localize('Required')
    $(document).on('ajaxComplete', () => {
            contingentProps.forEach(prop => {
                var label = $(`[for="${prop}"]`)
                if (label) {
                    $(document).off('ajaxComplete')
                    setRequired(label, pageForm.viewModel[boolProp])
                }
            })

            pageForm.viewModel.bind('change', e => {
                if (e.field == boolProp)  {
                    contingentProps.forEach(prop => {
                        var label = $(`[for="${prop}"]`)
                        if (label) {
                            setRequired(label, pageForm.viewModel[boolProp])
                        }
                    })
                }
            })
    })

    function setRequired(label, required) {
        let element = label.parent()
        let previousText = label.text();
        let newText = required ? previousText + ` (${requiredText})` : previousText.replace(` (${requiredText})`, '')
        label.text(newText)

        element.prop('required', required)
        element.find('input').each((index, input) => {
            $(input).prop('required', required)
        })
    
    }
})
