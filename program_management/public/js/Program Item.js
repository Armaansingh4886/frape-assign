// frappe.ui.form.on('Program Item', {
//     refresh:function(frm,cdt,cdn){
//     },
//     item_group: function(frm, cdt, cdn) {
//         let row = locals[cdt][cdn];
//         // Custom logic when 'fieldname' is changed in the child table
//         if (row.item_group) {
// //   frappe.model.set_query(cdt, cdn, 'item', '123');
//   frm.set_query('item', function() {
//     return {
//         filters: {
//             "item_group": row.item_group
//         }
//     };
// });
//             console.log(row);
//             // Perform some action based on the field value
//             frappe.msgprint(`Field value changed to: ${row.item_group}`);
//         }
//     },
//     item: function(frm, cdt, cdn) {
//         let row = locals[cdt][cdn];
//         // Custom logic when 'another_fieldname' is changed in the child table
//         if (row.item) {
//             // Perform some action based on the field value
//             frappe.msgprint(row.item)
//             // frappe.model.set_value(cdt, cdn, 'fieldname', 'New Value');
//         }
//     }
// });
