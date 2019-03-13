package at.technikumwien.news;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

@Entity
@Table(name="t_news")
@NamedQuery(name="News.selectAll", query="SELECT n FROM News n")
public class News {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(length=100, nullable=false)
	private String firstName;
	
	@Column(length=100, nullable=false)
	private String lastName;
	
	@Column(length=100, nullable=false)
	private String birthDate;
	
	@Column(length=100, nullable=false)
	private Boolean active;
	
	public News() {}


	public News(Long id, String firstName, String lastName, String birthDate, Boolean active ) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstName;
	}

	public void setFirstname(String firstName) {
		this.firstName = firstName;
	}

	public String getLastname() {
		return lastName;
	}

	public void setLastname(String lastName) {
		this.lastName = lastName;
	}
	
	public String getBirthDate() {
		return birthDate;
	}
	
	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
	public void setActiveState (Boolean state) {
		this.active = state;
	}
	
	public Boolean getActive() {
		return this.active;
	}

	@Override
	public String toString() {
		return "News [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", birthdate= " + birthDate + ", isActive=" + active + "]";
	}
}