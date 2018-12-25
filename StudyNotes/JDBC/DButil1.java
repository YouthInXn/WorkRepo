package dcwj;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;

//  使用连接池技术连接
public class DButil1 {
	private static BasicDataSource basicdata;
	//为不同的线程管理连接
	private static ThreadLocal<Connection> tl;
	static {
		try {
//			加载配置文件
			Properties prop = new Properties();
			FileInputStream fis = new FileInputStream(
					"D:\\WorkSpace2\\dcwj\\src\\dcwj\\config.properties");
			prop.load(fis);
			fis.close();
//			初始化连接池
			basicdata = new BasicDataSource();
			String drivername= prop.getProperty("driver");
			basicdata.setDriverClassName(drivername);
			String user = prop.getProperty("user");
			basicdata.setUsername(user);
			String pwd = prop.getProperty("pwd");
			basicdata.setPassword(pwd);
			String url = prop.getProperty("url");
			basicdata.setUrl(url);
//			设置最大连接数
			basicdata.setMaxActive(Integer.parseInt(prop.getProperty("maxactive")));
//			设置最小连接数
			basicdata.setInitialSize(Integer.parseInt(prop.getProperty("initsize")));
//			设置最大等待时间
			basicdata.setMaxWait(Integer.parseInt(prop.getProperty("maxwait")));
//			设置最小空闲连接数
			basicdata.setMinIdle(Integer.parseInt(prop.getProperty("minidle")));
			tl= new ThreadLocal<Connection>();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static Connection getConnection() throws SQLException {
		Connection conn = basicdata.getConnection();
		tl.set(conn);
		return conn;
	} 
	
	public static void closeConnection() {
//		ThreadLocal
		Connection conn = tl.get();
		try {
		if(conn!=null) {
//			将连接恢复为自动提交
			conn.setAutoCommit(true);
//			通过连接池获取的Connection
//			的close()方法并不是将连接关闭
//			而是将连接还给连接池
		   conn.close();
		   tl.remove();
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
