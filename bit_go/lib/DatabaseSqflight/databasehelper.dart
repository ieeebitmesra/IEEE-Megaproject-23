
import 'dart:io';
import 'package:bit_go/model/sosmodel.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class DBHelper{
  static Database? _db;

  Future<Database?> get db async{
    if(_db!=null){
      return _db;
    }
    _db = await initDatabase();
    return _db;
  }

  initDatabase() async{
    var directory = await getApplicationDocumentsDirectory();
     String path =join(directory.path,'notes.db');
    var db = await openDatabase(path,version: 1,onCreate:_onCreatingDatabase );
    return db;

  }

  _onCreatingDatabase(Database database, int version) async{
    await database.execute("CREATE TABLE contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, number INTEGER NOT NULL)");
  }

  Future<ContactModel> insert(ContactModel contactModel)async{
     var dbclient=  await db;
    await dbclient!.insert('contacts', contactModel.toMap());

     return contactModel;
  }

  Future<List<ContactModel>> getcontactlist() async{
    var dbClient = await db;
    final List<Map<String,Object?>> quereresult = await dbClient!.query('contacts');
    return quereresult.map((e) => ContactModel.fromMap(e)).toList();
  }
  Future<int> delete(int id) async{
    var  dbclient = await db;
    return await dbclient!.delete(
      'contacts',
      where:  'id = ?',
      whereArgs: [id]
    );
  }

}
