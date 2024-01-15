

class ContactModel{
  final int? id;
  final String name;
  final  int number;
  ContactModel({required this.name,required this.number,this.id});
  ContactModel.fromMap(Map<String,dynamic>res) :
      id  = res["id"],
       name = res["name"],
        number  = res["number"];

  Map<String,Object?> toMap(){
return{
  'id':id,
  'name':name,
  'number': number,
  };

}

}