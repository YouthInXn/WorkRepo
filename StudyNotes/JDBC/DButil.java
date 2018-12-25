package dcwj;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DButil {
//  连接数据库路径
  private static String url;
//  连接数据库的用户名
  private static String user;
//  连接数据库的密码
  private static String pwd;
//  用于管理不同线程所获取的连接
  public static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();
  static {
//	  代码块里加载配置文件
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
//  创建数据库连接  数据从配置文件中读取
  public static Connection getConnection() throws SQLException {
		Connection conn = DriverManager.getConnection(url,user,pwd);
//		set方法会把当前线程作为key ,将指定的连接作为value保存在内部的map里
		tl.set(conn);
		return conn;
  }
//  关闭数据库连接
  public static void CloseConnection() {
	  try {
//		  根据key值(当前线程)拿到value连接，并关闭
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
