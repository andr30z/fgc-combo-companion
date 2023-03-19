package com.fgc.combo.companion.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ToString(exclude = { "playlist", "combo" })
@EqualsAndHashCode(exclude = { "playlist", "combo" })
@Table(name = "tags")
public class Tag {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tag_seq")
  @SequenceGenerator(
    name = "tag_seq",
    sequenceName = "tag_seq",
    allocationSize = 1
  )
  @Column(name = "id", updatable = false)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String color;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @ManyToOne
  @JsonBackReference
  @JoinColumn(name = "combo_id", nullable = true)
  private Combo combo;

  @ManyToOne
  @JsonBackReference
  @JoinColumn(name = "playlist_id", nullable = true)
  private Playlist playlist;
}
