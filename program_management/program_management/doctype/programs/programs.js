// Copyright (c) 2024, armaan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Programs", {
    refresh(frm) {
        frm.add_custom_button("Add Item", () => {
            let d = new frappe.ui.Dialog({
                title: 'Enter details',
                "fields": [
                    {
                        "fieldname": "item_group",
                        "fieldtype": "Link",
                        "label": "Item Group",
                        "options": "Item Group",
                        "reqd": 1,
                        onchange:()=>{
                            d.fields_dict.item.refresh()
                            d.fields_dict.item.df.link_filters=`[[\"Item\",\"item_group\",\"=\",\"${d.get_value('item_group')}\"]]`
                        }
                    },
                    {
                        "fieldname": "item",
                        "fieldtype": "Link",
                        "in_list_view": 1,
                        "label": "Item",
                        "link_filters": "[]",
                        "options": "Item",
                        onchange: () => {t
                            let item = d.get_value("item")
                            frappe.db.get_value("Item",item,"item_name",(r)=>{d.set_value("item_name",r.item_name)})
                            
                        },
//                      
                        "link_filters": `[[\"Item\",\"item_group\",\"=\",\"${""}\"]]`,
                        "reqd": 1
                    },
                    {
                        "fieldname": "item_name",
                        "fieldtype": "Data",
                        "label": "Item Name",
                        "read_only": 1
                    },
                    {
                        "fieldname": "quantitiy",
                        "fieldtype": "Int",
                        "in_list_view": 1,
                        "label": "Quantitiy",
                        "reqd": 1
                    },
                    {
                        "default": "0",
                        "fieldname": "finish",
                        "fieldtype": "Check",
                        "label": "Finish"
                    },
                    {
                        "fieldname": "description",
                        "fieldtype": "Long Text",
                        "in_list_view": 1,
                        "label": "Description",
                        "reqd": 1
                    }
                ],
                size: 'small',
                primary_action_label: 'Add',
                primary_action(values) {
                    console.log(values);
                    var row = cur_frm.add_child('program_items');
                    for (var key in values) {
                        if (values.hasOwnProperty(key)) {
                            row[key] = values[key];
                        }
                    }
                    cur_frm.refresh_field('program_items');
                    frm.save().then(() => { frappe.msgprint("added succesfully") }).catch((err)=>{frape.msgprint("an error while saving"+err)})
                    d.hide();
                }
            });

            d.show();

        }),



            frm.add_custom_button("Update Items", () => {

                let items = frm.doc.program_items.filter((i) => !i.finish)
                let item;
                let options
                if(items.length!==0){
                options = items.map((items) => { return items.item })}else{frappe.throw("no items to update . Add an item")}
                console.log(items);
                let d = new frappe.ui.Dialog({
                    title: 'Enter details',
                    "fields": [{
                        "fieldname": "selected_item",
                        "fieldtype": "Select",
                        "label": "Select Item",
                        "options": options,
                        "reqd": 1,
                        onchange: () => {
                            item = items.filter((i) => { return i.item === d.get_value("selected_item"); })[0]
                            d.set_value("item_group", item.item_group)
                            d.set_value('quantitiy', item.quantitiy)
                            d.set_value('item', item.item)
                            d.set_value("finish", item.finish)
                            d.set_value("item_name",item.item_name)
                            d.set_value('description', item.description)
                            d.set_value('name', item.name)
                            console.log(item);
                        }
                    },
                    {
                        "fieldname": "item_group",
                        "fieldtype": "Link",
                        "label": "Item Group",
                        "options": "Item Group",
                        "reqd": 1,
                        "read_only": 1
                    },
                    {
                        "fieldname": "item",
                        "fieldtype": "Link",
                        "in_list_view": 1,
                        "label": "Item",
                        "link_filters": "[]",
                        "options": "Item",
                        "read_only": 1,

                        "reqd": 1
                    },
                    {
                        "fieldname": "item_name",
                        "fieldtype": "Data",
                        "label": "Item Name",
                        "read_only": 1
                    },
                    {
                        "fieldname": "quantitiy",
                        "fieldtype": "Int",
                        "in_list_view": 1,
                        "label": "Quantitiy",
                        "reqd": 1
                    },
                    {
                        "default": "0",
                        "fieldname": "finish",
                        "fieldtype": "Check",
                        "label": "Finish"
                    },
                    {
                        "fieldname": "description",
                        "fieldtype": "Long Text",
                        "in_list_view": 1,
                        "label": "Description",
                        "reqd": 1
                    }
                    ],
                    size: 'small',
                    primary_action_label: 'Submit',
                    primary_action(values) {
                        console.log(values);
                        item.quantitiy = values.quantitiy
                        item.finish = values.finish
                        item.description = values.description
                        frm.dirty()
                        frm.save().then(() => { frappe.msgprint("Updated succesfully") })

                        d.hide();
                    }
                });

                d.show();

            })
    },
});

