package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.FillUp;

@Transactional
@Repository
public class FuelDAO implements FuelDAOIntr {
	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<FillUp> index() {
		String query = "SELECT f FROM FillUp f";
		return em.createQuery(query, FillUp.class).getResultList();
	}

	@Override
	public FillUp show(int id) {
		return em.find(FillUp.class, id);
	}

	@Override
	public FillUp create(FillUp fillUp) {
		try {
			em.persist(fillUp);
			em.flush();
			return em.find(FillUp.class, fillUp.getId());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public FillUp update(int id, FillUp fillUp) {
		try {
			FillUp managaedFillUp = em.find(FillUp.class, id);
			managaedFillUp.setMiles(fillUp.getMiles());
			managaedFillUp.setGallons(fillUp.getGallons());
			managaedFillUp.setPrice(fillUp.getPrice());
			em.persist(managaedFillUp);
			em.flush();
			return em.find(FillUp.class, managaedFillUp.getId());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean destroy(int id) {
		try {
			em.remove(em.find(FillUp.class, id));
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
