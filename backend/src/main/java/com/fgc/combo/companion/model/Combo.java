package com.fgc.combo.companion.model;

import com.fgc.combo.companion.enums.ComboGameTypes;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
@Table(name = "combos")
public class Combo {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "combo_seq")
  @SequenceGenerator(
    name = "combo_seq",
    sequenceName = "combo_seq",
    allocationSize = 1
  )
  @Column(name = "id", updatable = false)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String combo;

  private String description;

  @Column(nullable = false, columnDefinition = "VARCHAR(20) default 'TEKKEN_7'")
  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write = "?::gametypes")
  private ComboGameTypes game;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(
    name = "user_owner_id",
    referencedColumnName = "id",
    nullable = false
  )
  @Fetch(value = FetchMode.JOIN)
  private User owner;

  @OneToMany(mappedBy = "combo", fetch = FetchType.LAZY)
  @Fetch(value = FetchMode.JOIN)
  @Builder.Default
  private Set<Tag> tags = new HashSet<>();

  public void setGame(String literalString) {
    this.game = ComboGameTypes.valueOf(literalString);
  }
}
