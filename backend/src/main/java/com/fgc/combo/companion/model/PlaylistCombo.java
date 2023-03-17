package com.fgc.combo.companion.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "playlist_combo")
public class PlaylistCombo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "playlist_combo_seq")
    @SequenceGenerator(name = "playlist_combo_seq", sequenceName = "playlist_combo_seq", allocationSize = 1)
    @Column(name = "id", updatable = false)
    Long id;

    @Column(nullable = false)
    Integer position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "combo_id")
    @Fetch(value = FetchMode.JOIN)
    Combo combo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "playlist_id")
    @Fetch(value = FetchMode.JOIN)
    Playlist playlist;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "added_at")
    LocalDateTime addedAt;
}
