package dcwj;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;

//  ʹ�����ӳؼ�������
public class DButil1 {
	private static BasicDataSource basicdata;
	//Ϊ��ͬ���̹߳�������
	private static ThreadLocal<Connection> tl;
	static {
		try {
//			���������ļ�
			Properties prop = new Properties();
			FileInputStream fis = new FileInputStream(
					"D:\\WorkSpace2\\dcwj\\src\\dcwj\\config.properties");
			prop.load(fis);
			fis.close();
//			��ʼ�����ӳ�
			basicdata = new BasicDataSource();
			String drivername= prop.getProperty("driver");
			basicdata.setDriverClassName(drivername);
			String user = prop.getProperty("user");
			basicdata.setUsername(user);
			String pwd = prop.getProperty("pwd");
			basicdata.setPassword(pwd);
			String url = prop.getProperty("url");
			basicdata.setUrl(url);
//			�������������
			basicdata.setMaxActive(Integer.parseInt(prop.getProperty("maxactive")));
//			������С������
			basicdata.setInitialSize(Integer.parseInt(prop.getProperty("initsize")));
//			�������ȴ�ʱ��
			basicdata.setMaxWait(Integer.parseInt(prop.getProperty("maxwait")));
//			������С����������
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
//			�����ӻָ�Ϊ�Զ��ύ
			conn.setAutoCommit(true);
//			ͨ�����ӳػ�ȡ��Connection
//			��close()���������ǽ����ӹر�
//			���ǽ����ӻ������ӳ�
		   conn.close();
		   tl.remove();
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
