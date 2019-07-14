import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            '運営からのおすすめ',
            style: Theme.of(context).textTheme.headline,
          ),
          Text(
            '人気のカテゴリ',
            style: Theme.of(context).textTheme.headline,
          ),
          Text(
            '人気のチャレンジ',
            style: Theme.of(context).textTheme.headline,
          ),
        ],
      ),
    );
  }
}
