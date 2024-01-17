import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ErpOverlayScreen extends StatefulWidget {
  const ErpOverlayScreen({super.key});

  @override
  State<ErpOverlayScreen> createState() => _ErpOverlayScreenState();
}

class _ErpOverlayScreenState extends State<ErpOverlayScreen> {
  final newerp =  Uri.parse('https://erpportal.bitmesra.ac.in/login.htm;jsessionid=CA2DC8BA1FF38008CCE421A0043865EC');
  final olderp = Uri.parse('https://erp.bitmesra.ac.in/iitmsv4eGq0RuNHb0G5WbhLmTKLmTO7YBcJ4RHuXxCNPvuIw=?enc=EGbCGWnlHNJ/WdgJnKH8DA==');

  @override
  Widget build(BuildContext context) {
    return SizedBox(
       height: 250,
      width: double.infinity,
      child: Column(
        children: [
          SizedBox(height: 6,),
          Container(
            width: 300,
            child: ElevatedButton(
                onPressed: (){
                  Navigator.pop(context);
                  setState(() {
                    launchUrl(
                      newerp,
                      mode: LaunchMode.externalApplication,
                    );
                  });
                },
                child: Text('New ERP')),
          ),
          SizedBox(height: 6,),
          Container(
            width: 300,
            child: ElevatedButton(
                onPressed: (){
                  Navigator.pop(context);
                  setState(() {
                    launchUrl(
                      olderp,
                      mode: LaunchMode.externalApplication,
                    );
                  });
                },
                child: Text('Old ERP')),
          )

        ],
      ),
    );
  }
}
