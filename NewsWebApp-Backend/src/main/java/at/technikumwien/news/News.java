package at.technikumwien.news;

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
@XmlAccessorType(XmlAccessType.FIELD)
public class News {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@XmlAttribute
	private Long id;
	
	@Column(length=100, nullable=false)
	@XmlAttribute
	private String title;
	
	@Column(length=1000, nullable=false)
	@XmlAttribute
	private String text;
	
	public News() {}

	public News(String title, String text) {
		this.title = title;
		this.text = text;
	}	
	
	public News(Long id, String title, String text) {
		this.id = id;
		this.title = title;
		this.text = text;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Override
	public String toString() {
		return "News [id=" + id + ", title=" + title + ", text=" + text + "]";
	}
}