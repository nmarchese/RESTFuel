package test;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.FillUp;

public class FillUpTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	private FillUp fillUp = null;
	
	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("fuel");
		em = emf.createEntityManager();
		fillUp = em.find(FillUp.class, 1);
	}
	
	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
	}
	
	@Test
	public void test() {
	  boolean pass = true;
	  assertEquals(pass, true);
	}
	
	@Test
	public void test_fillUp_mapping() {
		assertNotNull(fillUp);
		assertEquals(1, fillUp.getId());
		assertEquals(223.4, fillUp.getMiles(),.01);
		assertEquals(26.89, fillUp.getPrice(),.01);
	}
}
