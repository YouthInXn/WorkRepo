package dcwj;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DButil {
//  �������ݿ�·��
  private static String url;
//  �������ݿ���û���
  private static String user;
//  �������ݿ������
  private static String pwd;
//  ���ڹ���ͬ�߳�����ȡ������
  public static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();
  static {
//	  ���������������ļ�
		try {
			Properties prop = new Properties();
			FileInputStream fis = new FileInputStream(
					  "D:\\WorkSpace2\\dcwj\\src\\dcwj\\config.properties");
			prop.load(fis);
			fis.close();
			String driver=prop.getProperty("driver");
			url = prop.getProperty("url");
			user=prop.getProperty("user");
			pwd = prop.getProperty("pwd");	
			Class.forName(driver);
		} catch (Exception e) {
			e.printStackTrace();
		}
  }
//  �������ݿ�����  ���ݴ������ļ��ж�ȡ
  public static Connection getConnection() throws SQLException {
		Connection conn = DriverManager.getConnection(url,user,pwd);
//		set������ѵ�ǰ�߳���Ϊkey ,��ָ����������Ϊvalue�������ڲ���map��
		tl.set(conn);
		return conn;
  }
//  �ر����ݿ�����
  public static void CloseConnection() {
	  try {
//		  ����keyֵ(��ǰ�߳�)�õ�value���ӣ����ر�
		  Connection conn = tl.get();
		  if(conn!=null) {
			  conn.close();
			  tl.remove();
		  }
	  }catch(Exception e) {
		  e.printStackTrace();
	  }
  }
}
