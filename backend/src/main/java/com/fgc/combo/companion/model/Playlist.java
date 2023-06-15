package com.fgc.combo.companion.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "playlists")
public class Playlist {

  @Id
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "playlist_seq"
  )
  @SequenceGenerator(
    name = "playlist_seq",
    sequenceName = "playlist_seq",
    allocationSize = 1
  )
  @Column(name = "id", updatable = false)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = true)
  private String description;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  LocalDateTime createdAt;

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_at")
  LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(
    name = "user_owner_id",
    referencedColumnName = "id",
    nullable = false
  )
  @Fetch(value = FetchMode.JOIN)
  private User owner;

  @OneToMany(
    mappedBy = "playlist",
    fetch = FetchType.LAZY,
    cascade = CascadeType.ALL
  )
  @Fetch(value = FetchMode.JOIN)
  @Builder.Default
  Set<PlaylistCombo> playlistCombos = new HashSet<>();

  @OneToMany(mappedBy = "playlist", fetch = FetchType.LAZY)
  @Fetch(value = FetchMode.JOIN)
  @Builder.Default
  private Set<Tag> tags = new HashSet<>();
}
