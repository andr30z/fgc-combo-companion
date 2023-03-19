package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.Tag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, Long> {
 
  @Modifying
  @Query("delete from Tag t where t.id in ?1 and t.playlist = ?2")
  void deleteTagsByPlaylist(List<Long> ids, Playlist playlist);

  @Modifying
  @Query("delete from Tag t where t.id in ?1 and t.combo = ?2")
  void deleteTagsByCombo(List<Long> ids, Combo combo);
}
